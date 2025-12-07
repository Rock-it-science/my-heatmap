import { PrismaClient, StravaAccessToken } from "../../../../generated/prisma";
import {
	StravaRefreshResponse,
	StravaTokenResponse,
} from "./strava-auth.types";
import { PrismaStravaTokenRepository } from "./strava-auth.stores";
import { STRAVA_TOKEN_STATUSES } from "./strava-auth.types";
import strava from "strava-v3";

/**
 * Authorize with Strava API and get refresh token
 */
async function exchangeAuthCodeForToken(
	authCode: string,
): Promise<StravaTokenResponse> {
	console.log("debug - sending code to strava");
	if (!process.env.STRAVA_CLIENT_ID || !process.env.STRAVA_CLIENT_SECRET) {
		throw Error("Client ID or secret not set");
	}
	try {
		strava.config({
			access_token: "not set yet",
			client_id: process.env.STRAVA_CLIENT_ID,
			client_secret: process.env.STRAVA_CLIENT_SECRET,
			redirect_uri: "localhost",
		});
	} catch (error) {
		throw Error(`Error setting Strava config: ${error.message}`);
	}
	const response: StravaTokenResponse = await strava.oauth.getToken(authCode);
	console.log("debug - received response from strava");
	return response;
}

/**
 * Use refresh token to fetch new access token
 */
async function refreshExpiredAccessToken(
	refreshToken: string,
): Promise<StravaRefreshResponse> {
	if (!process.env.STRAVA_CLIENT_SECRET) {
		throw Error("Strava client secret not set");
	}

	const formData = new URLSearchParams();
	formData.append("client_id", process.env.STRAVA_CLIENT_ID || "175179");
	formData.append("client_secret", process.env.STRAVA_CLIENT_SECRET);
	formData.append("grant_type", "refresh_token");
	formData.append("refresh_token", refreshToken);

	const request: RequestInfo = new Request(
		"https://www.strava.com/oauth/token",
		{
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: formData,
		},
	);

	const response = await fetch(request);

	if (!response.ok) {
		const errorText = await response.text();
		throw new Error(
			`Strava API error: ${response.status} ${response.statusText} - ${errorText}`,
		);
	}

	return response.json(); // TODO proper type casting to StravaRefreshResponse
}

/**
 * Returns true if given token has not yet expired.
 * @param token
 * @returns
 */
function isTokenValid(token: StravaAccessToken): boolean {
	if (new Date(Number(token.expiresAt) * 1000) < new Date()) {
		return false;
	} else {
		return true;
	}
}

export const StravaAuthService = {
	/**
	 * Exchange authorization code for short-lived access token and refresh token.
	 * Tokens are stored and athlete ID is returned
	 */
	stravaAuthCallback: async (
		stravaAuthCode: string,
		stravaAuthScope: string,
		prismaClient: PrismaClient,
	): Promise<{ athleteId: number }> => {
		const tokenRepository = new PrismaStravaTokenRepository(prismaClient);
		if (!tokenRepository) {
			throw Error("Could not initialize token repository");
		}

		const tokenResponse = await exchangeAuthCodeForToken(stravaAuthCode);
		console.log("debug -  storing tokens");
		const success = await tokenRepository.storeTokens(
			{
				athleteId: tokenResponse.athlete.id,
				scope: stravaAuthScope ?? "read",
				tokenCode: tokenResponse.access_token,
				expiresAt: BigInt(tokenResponse.expires_at),
			},
			{
				athleteId: tokenResponse.athlete.id,
				tokenCode: tokenResponse.refresh_token,
				scope: stravaAuthScope || "read",
			},
		);

		if (!success) {
			throw Error("Failure storing tokens in database");
		}
		console.log("debug - successfully stored tokens");
		return { athleteId: tokenResponse.athlete.id };
	},

	getAuthToken: async (athleteId: number, prismaClient: PrismaClient) => {
		const tokenRepository = new PrismaStravaTokenRepository(prismaClient);
		if (!tokenRepository) {
			throw Error("Could not initialize token repository");
		}
		return tokenRepository.getAccessToken(athleteId);
	},

	getTokenStatus: async (athleteId: number, prismaClient: PrismaClient) => {
		const tokenRepository = new PrismaStravaTokenRepository(prismaClient);
		if (!tokenRepository) {
			throw Error("Could not initialize token repository");
		}
		const token = await tokenRepository.getAccessToken(athleteId);
		if (token) {
			console.log(`Token found for athlete ${athleteId}`);
			if (isTokenValid(token)) {
				return STRAVA_TOKEN_STATUSES.ACTIVE;
			}
			return STRAVA_TOKEN_STATUSES.EXPIRED;
		}
		return STRAVA_TOKEN_STATUSES.MISSING;
	},

	refreshAuth: async (athleteId: number, prismaClient: PrismaClient) => {
		const tokenRepository = new PrismaStravaTokenRepository(prismaClient);
		if (!tokenRepository) {
			throw Error("Could not initialize token repository");
		}

		const refreshToken = await tokenRepository.getRefreshToken(athleteId);

		if (!refreshToken) {
			throw Error("Refresh Auth - Failed to find existing refresh token");
		}
		const tokenResponse = await refreshExpiredAccessToken(
			refreshToken.tokenCode,
		);
		const success = tokenRepository.storeTokens(
			{
				athleteId: athleteId,
				scope: refreshToken.scope ?? "read",
				tokenCode: tokenResponse.access_token,
				expiresAt: BigInt(tokenResponse.expires_at),
			},
			{
				athleteId: athleteId,
				tokenCode: tokenResponse.refresh_token,
				scope: refreshToken.scope || "read",
			},
		);
		if (!success) {
			throw Error("Failure storing tokens in database");
		}
		return true;
	},
};
