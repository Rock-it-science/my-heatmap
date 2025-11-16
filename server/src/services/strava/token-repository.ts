import {
	PrismaClient,
	StravaAccessToken,
	StravaRefreshToken,
} from "../../../generated/prisma";

export interface StravaTokenRepository {
	storeTokens(
		accessToken: StravaAccessToken,
		refreshToken: StravaRefreshToken,
	): Promise<boolean>;
	getAccessToken(athleteId: number): Promise<StravaAccessToken | null>;
	getRefreshToken(athleteId: number): Promise<StravaRefreshToken | null>;
	deleteTokens(athleteId: number): Promise<boolean>;
}

export class PrismaStravaTokenRepository implements StravaTokenRepository {
	constructor(private client: PrismaClient) {}

	async storeTokens(
		accessToken: StravaAccessToken,
		refreshToken: StravaRefreshToken,
	): Promise<boolean> {
		try {
			await this.client.stravaAccessToken.upsert({
				create: accessToken,
				update: accessToken,
				where: {
					athleteId: accessToken.athleteId,
				},
			});

			await this.client.stravaRefreshToken.upsert({
				create: refreshToken,
				update: refreshToken,
				where: {
					athleteId: refreshToken.athleteId,
				},
			});

			return true;
		} catch (error) {
			console.error("Error storing tokens:", error);
			return false;
		}
	}

	async getAccessToken(athleteId: number): Promise<StravaAccessToken | null> {
		try {
			return await this.client.stravaAccessToken.findFirst({
				where: { athleteId },
			});
		} catch (error) {
			console.error("Error getting access token:", error);
			return null;
		}
	}

	async getRefreshToken(
		athleteId: number,
	): Promise<StravaRefreshToken | null> {
		try {
			return await this.client.stravaRefreshToken.findFirst({
				where: { athleteId },
			});
		} catch (error) {
			console.error("Error getting refresh token:", error);
			return null;
		}
	}

	async deleteTokens(athleteId: number): Promise<boolean> {
		try {
			await this.client.stravaAccessToken.deleteMany({
				where: { athleteId },
			});
			await this.client.stravaRefreshToken.deleteMany({
				where: { athleteId },
			});
			return true;
		} catch (error) {
			console.error("Error deleting tokens:", error);
			return false;
		}
	}
}
