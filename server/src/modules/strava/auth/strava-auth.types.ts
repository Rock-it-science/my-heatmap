import { FastifyRequest } from "fastify";

/* Shape of responses from Strava auth endpoints */
export type StravaCallbackRequest = FastifyRequest<{
	Querystring: {
		state?: string;
		code: string; // Auth code
		scope: string;
		error?: string;
	};
}>;

/**
 * Contains short-lived access token and refresh token.
 * Access token is used to access Strava API functionality
 * Refresh token is used to generate the next access token. Will change with each token.
 */
export interface StravaTokenResponse {
	token_type: string;
	expires_at: number;
	expires_in: number;
	refresh_token: string;
	access_token: string;
	athlete: {
		id: number;
		username: string;
		resource_state: number;
		firstname: string;
		lastname: string;
		city: string;
		state: string;
		country: string;
	};
}

export interface StravaRefreshResponse {
	access_token: string;
	expires_at: number;
	expires_in: number;
	refresh_token: string;
}

export enum STRAVA_TOKEN_STATUSES {
	ACTIVE,
	EXPIRED,
	MISSING,
}
