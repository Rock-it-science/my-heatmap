import { StravaTokenResponse } from "./types";

/**
 * Returns true if given token has not yet expired.
 * @param token
 * @returns
 */
function isAccessTokenValid(token: StravaTokenResponse): boolean {
	if (new Date(token.expires_at) < new Date()) {
		return false;
	} else {
		return true;
	}
}

async function refreshTokenIfNeeded(userId: string) {}

async function getValidToken(userId: string) {}

/**
 * Authorize with Strava API and get refresh token
 */
export async function exchangeAuthCodeForToken(
	authCode: string,
): Promise<StravaTokenResponse> {
	if (!process.env.STRAVA_CLIENT_SECRET) {
		throw Error("Strava client secret not set");
	}

	const formData = new URLSearchParams();
	formData.append("client_id", process.env.STRAVA_CLIENT_ID || "175179");
	formData.append("client_secret", process.env.STRAVA_CLIENT_SECRET);
	formData.append("code", authCode);
	formData.append("grant_type", "authorization_code");

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

	return response.json(); // TODO proper type casting to StravaTokenResponse
}
