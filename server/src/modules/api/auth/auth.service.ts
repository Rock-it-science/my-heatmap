import { PrismaClient } from "@prisma/client";
import { PrismaStravaTokenRepository } from "../../strava/auth/strava-auth.stores";

export const AuthService = {
	logout: async (athleteId: number, prismaClient: PrismaClient) => {
		const tokenRepository = new PrismaStravaTokenRepository(prismaClient);
		if (!tokenRepository) {
			throw Error("Database not initialized");
		}

		const success = await tokenRepository.deleteTokens(athleteId);
		if (success) {
			return true;
		} else {
			throw Error("Failed to log out");
		}
	},
};
