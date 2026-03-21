import { StravaOAuthProvider } from "../../../providers/strava/StravaProviders";
import { StravaAuth } from "../../../types/strava.types";
import { STRAVA_TOKEN_STATUSES } from "./strava-auth.types";
import strava, { RefreshTokenResponse } from "strava-v3";

/**
 * Authorize with Strava API and get refresh token
 */
async function exchangeAuthCodeForToken(
	authCode: string,
): Promise<RefreshTokenResponse> {
	if (!process.env.STRAVA_CLIENT_ID || !process.env.STRAVA_CLIENT_SECRET) {
		throw Error("Client ID or secret not set");
	}
	const stravaOAuthProvider = new StravaOAuthProvider();
	const response = await stravaOAuthProvider.getToken(authCode);
	return response;
}

/**
 * Use refresh token to fetch new access token
 */
async function refreshExpiredAccessToken(
	refreshToken: string,
): Promise<RefreshTokenResponse> {
	if (!process.env.STRAVA_CLIENT_ID || !process.env.STRAVA_CLIENT_SECRET) {
		throw Error("Client ID or secret not set");
	}
	const stravaOAuthProvider = new StravaOAuthProvider();
	const response = await stravaOAuthProvider.refreshToken(refreshToken);
	return response;
}

/**
 * Returns true if given token has not yet expired.
 * @param token
 * @returns
 */
function isTokenValid(token: { expiresAt: Date }): boolean {
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
	): Promise<RefreshTokenResponse> => {
		const tokenResponse = await exchangeAuthCodeForToken(stravaAuthCode);

		return tokenResponse;
	},

	getTokenStatus: async (token: { expiresAt: Date }) => {
		if (token) {
			if (isTokenValid(token)) {
				return STRAVA_TOKEN_STATUSES.ACTIVE;
			}
			return STRAVA_TOKEN_STATUSES.EXPIRED;
		}
		return STRAVA_TOKEN_STATUSES.MISSING;
	},

	refreshAuth: async (
		stravaAuth: StravaAuth,
	): Promise<{
		accessToken: string;
		expiresAt: number;
		refreshToken: string;
	}> => {
		const refreshToken = stravaAuth.refreshToken.code;
		if (!refreshToken) {
			throw Error("Refresh Auth - Failed to find existing refresh token");
		}
		const tokenResponse = await refreshExpiredAccessToken(refreshToken);
		return {
			accessToken: tokenResponse.access_token,
			expiresAt: tokenResponse.expires_at,
			refreshToken: tokenResponse.refresh_token,
		};
	},
};
