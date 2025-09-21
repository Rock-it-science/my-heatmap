import { PrismaClient } from "../../../prisma/generated/prisma";
import { PrismaStravaTokenRepository } from "./token-repository";

describe("TokenRepository", () => {
	let prismaClient: PrismaClient;
	let tokenRepository: PrismaStravaTokenRepository;

	beforeAll(async () => {
		prismaClient = await new PrismaClient();
		tokenRepository = new PrismaStravaTokenRepository(prismaClient);
	});

	beforeEach(async () => {
		await prismaClient.stravaAccessToken.deleteMany({});
		await prismaClient.stravaRefreshToken.deleteMany({});
	});

	afterAll(async () => {
		if (prismaClient) {
			await prismaClient.$disconnect();
		}
	});

	describe("storeTokens", () => {
		it("should store a token for a given athlete", async () => {
			const success = await tokenRepository.storeTokens(
				{
					athleteId: 1,
					scope: "read",
					tokenCode: "access",
					expiresAt: BigInt(Date.now() + 3600),
				},
				{
					athleteId: 1,
					tokenCode: "refresh_token_123",
					scope: "read",
				},
			);
			expect(success).toBe(true);

			const result = await prismaClient.stravaAccessToken.findFirst({
				where: { athleteId: 1 },
			});
			expect(result).toBeDefined();
			expect(result).toHaveProperty("tokenCode");
			expect(result?.tokenCode).toBe("access");
		});
	});
	describe("getAccessToken", () => {
		it("should get access token for given athlete", async () => {
			// First store a token
			await tokenRepository.storeTokens(
				{
					athleteId: 1,
					scope: "read",
					tokenCode: "access_token_123",
					expiresAt: BigInt(Date.now() + 3600000),
				},
				{
					athleteId: 1,
					tokenCode: "refresh_token_123",
					scope: "read",
				},
			);

			// Then retrieve it
			const token = await tokenRepository.getAccessToken(1);

			expect(token).not.toBeNull();
			expect(token?.tokenCode).toBe("access_token_123");
			expect(token?.athleteId).toBe(1);
		});

		it("should return null for non-existent athlete", async () => {
			const token = await tokenRepository.getAccessToken(999);
			expect(token).toBeNull();
		});
	});

	describe("getRefreshToken", () => {
		it("should get refresh token for given athlete", async () => {
			// First store a token
			await tokenRepository.storeTokens(
				{
					athleteId: 1,
					scope: "read",
					tokenCode: "access_token_123",
					expiresAt: BigInt(Date.now() + 3600000),
				},
				{
					athleteId: 1,
					tokenCode: "refresh_token_123",
					scope: "read",
				},
			);

			// Then retrieve the refresh token
			const refreshToken = await tokenRepository.getRefreshToken(1);

			expect(refreshToken).not.toBeNull();
			expect(refreshToken?.tokenCode).toBe("refresh_token_123");
			expect(refreshToken?.athleteId).toBe(1);
		});

		it("should return null for non-existent athlete", async () => {
			const refreshToken = await tokenRepository.getRefreshToken(999);
			expect(refreshToken).toBeNull();
		});
	});

	describe("deleteTokens", () => {
		it("should delete tokens for given athlete", async () => {
			// Seed with test data using Prisma directly
			await tokenRepository.storeTokens(
				{
					athleteId: 1,
					tokenCode: "access_token_1",
					expiresAt: BigInt(Date.now() + 3600000),
					scope: "read",
				},
				{
					athleteId: 1,
					tokenCode: "refresh_token_1",
					scope: "read",
				},
			);

			await tokenRepository.storeTokens(
				{
					athleteId: 2,
					tokenCode: "access_token_2",
					expiresAt: BigInt(Date.now() + 3600000),
					scope: "read",
				},
				{
					athleteId: 2,
					tokenCode: "refresh_token_2",
					scope: "read",
				},
			);

			// Verify data exists
			const beforeAccessCount =
				await prismaClient.stravaAccessToken.count();
			const beforeRefreshCount =
				await prismaClient.stravaRefreshToken.count();
			expect(beforeAccessCount).toBe(2);
			expect(beforeRefreshCount).toBe(2);

			// Delete tokens for athlete 1
			const success = await tokenRepository.deleteTokens(1);
			expect(success).toBe(true);

			// Verify deletion
			const afterAccessCount =
				await prismaClient.stravaAccessToken.count();
			const afterRefreshCount =
				await prismaClient.stravaRefreshToken.count();
			expect(afterAccessCount).toBe(1);
			expect(afterRefreshCount).toBe(1);

			// Verify specific athlete's token is gone
			const token = await tokenRepository.getAccessToken(1);
			expect(token).toBeNull();
		});

		it("should handle deletion of non-existent athlete", async () => {
			const success = await tokenRepository.deleteTokens(999);
			expect(success).toBe(true); // Should still return true for non-existent
		});
	});

	describe("error handling", () => {
		it("should handle storeTokens with invalid data gracefully", async () => {
			// Test with missing required fields - this should be handled by Prisma validation
			const success = await tokenRepository.storeTokens(
				{
					athleteId: 1,
					tokenCode: "", // Empty token
					expiresAt: BigInt(Date.now() + 3600000),
					scope: "read",
				},
				{
					athleteId: 1,
					tokenCode: "refresh_token_123",
					scope: "read",
				},
			);

			// The method should still return true (error handling is in the catch block)
			expect(success).toBe(true);
		});

		it("should handle upsert correctly (update existing token)", async () => {
			// First, store a token
			await tokenRepository.storeTokens(
				{
					athleteId: 1,
					tokenCode: "original_access_token",
					expiresAt: BigInt(Date.now() + 3600000),
					scope: "read",
				},
				{
					athleteId: 1,
					tokenCode: "original_refresh_token",
					scope: "read",
				},
			);

			// Then update it with the same athlete ID
			await tokenRepository.storeTokens(
				{
					athleteId: 1,
					tokenCode: "updated_access_token",
					expiresAt: BigInt(Date.now() + 7200000),
					scope: "read,activity:read",
				},
				{
					athleteId: 1,
					tokenCode: "updated_refresh_token",
					scope: "read,activity:read",
				},
			);

			// Verify the token was updated, not duplicated
			const accessToken = await tokenRepository.getAccessToken(1);
			const refreshToken = await tokenRepository.getRefreshToken(1);

			expect(accessToken?.tokenCode).toBe("updated_access_token");
			expect(refreshToken?.tokenCode).toBe("updated_refresh_token");

			// Verify only one record exists for this athlete
			const accessCount = await prismaClient.stravaAccessToken.count({
				where: { athleteId: 1 },
			});
			const refreshCount = await prismaClient.stravaRefreshToken.count({
				where: { athleteId: 1 },
			});

			expect(accessCount).toBe(1);
			expect(refreshCount).toBe(1);
		});
	});

	describe("integration tests with seeded data", () => {
		it("should work with multiple athletes", async () => {
			// Seed with multiple test records using Prisma
			await tokenRepository.storeTokens(
				{
					athleteId: 1,
					tokenCode: "access_token_1",
					expiresAt: BigInt(Date.now() + 3600000),
					scope: "read",
				},
				{
					athleteId: 1,
					tokenCode: "refresh_token_1",
					scope: "read",
				},
			);

			await tokenRepository.storeTokens(
				{
					athleteId: 2,
					tokenCode: "access_token_2",
					expiresAt: BigInt(Date.now() + 3600000),
					scope: "read",
				},
				{
					athleteId: 2,
					tokenCode: "refresh_token_2",
					scope: "read",
				},
			);

			await tokenRepository.storeTokens(
				{
					athleteId: 3,
					tokenCode: "access_token_3",
					expiresAt: BigInt(Date.now() + 3600000),
					scope: "read",
				},
				{
					athleteId: 3,
					tokenCode: "refresh_token_3",
					scope: "read",
				},
			);

			// Test retrieving different athletes
			const token1 = await tokenRepository.getAccessToken(1);
			const token2 = await tokenRepository.getAccessToken(2);
			const token3 = await tokenRepository.getAccessToken(3);

			expect(token1).not.toBeNull();
			expect(token2).not.toBeNull();
			expect(token3).not.toBeNull();

			// Verify they have different tokens
			expect(token1?.tokenCode).not.toBe(token2?.tokenCode);
			expect(token2?.tokenCode).not.toBe(token3?.tokenCode);
		});

		it("should handle expired tokens correctly", async () => {
			// Seed with expired token data
			const expiredTime = BigInt(Date.now() - 3600000); // 1 hour ago
			await tokenRepository.storeTokens(
				{
					athleteId: 3,
					tokenCode: "expired_access_token",
					expiresAt: expiredTime,
					scope: "read",
				},
				{
					athleteId: 3,
					tokenCode: "valid_refresh_token",
					scope: "read",
				},
			);

			const expiredToken = await tokenRepository.getAccessToken(3);
			expect(expiredToken).not.toBeNull();
			expect(expiredToken?.tokenCode).toBe("expired_access_token");

			// Verify it's actually expired
			const now = BigInt(Date.now());
			expect(expiredToken?.expiresAt).toBeLessThan(now);
		});
	});
});
