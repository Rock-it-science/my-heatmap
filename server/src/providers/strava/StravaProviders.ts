import strava, {
	RefreshTokenResponse,
	StravaClientInstance,
	SummaryActivity,
} from "strava-v3";
import { StravaAuth } from "../../types/strava.types";

/**
 * Provider for Strava OAuth routes
 * The purpose of this class is exhanging an access token obtained from the Strava OAuth page for an access token required to use client provider
 */
export class StravaOAuthProvider {
	constructor() {
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
	}
	async getToken(authCode: string): Promise<RefreshTokenResponse> {
		return await strava.oauth.getToken(authCode);
	}
	async refreshToken(refreshToken: string): Promise<RefreshTokenResponse> {
		return await strava.oauth.refreshToken(refreshToken);
	}
}

export interface StreamSetAltitudeDistance {
	altitude: {
		data: number[];
		series_type: "distance";
		original_size: number;
		resolution: string;
	};
	distance: {
		data: number[];
		series_type: "distance";
		original_size: number;
		resolution: string;
	};
}

export interface StreamSetLatLngDistance {
	latlng: {
		data: [number, number][];
		series_type: "distance";
		original_size: number;
		resolution: string;
	};
	distance: {
		data: number[];
		series_type: "distance";
		original_size: number;
		resolution: string;
	};
}

export class StravaAthleteProvider {
	private client: StravaClientInstance;
	public athleteId: number;

	constructor(stravaAuth: StravaAuth) {
		this.client = new strava.client(stravaAuth.accessToken.code);
		this.athleteId = stravaAuth.athlete.id;
	}

	async listActivities(page: number): Promise<SummaryActivity[]> {
		return await this.client.athlete.listActivities({ page });
	}

	rateLimitExceeded(): boolean {
		return this.client.rateLimiting.exceeded();
	}

	/**
	 * Fetch data that can be used to form 3D position of activity along line
	 */
	async activityAltitudeStream(
		activityId: string,
	): Promise<StreamSetAltitudeDistance> {
		// strava-v3 activity stream function has incorrect return type annotated, correct type defined
		return (await this.client.streams.activity({
			id: activityId,
			keys: ["altitude"],
			key_by_type: true,
		})) as unknown as StreamSetAltitudeDistance;
	}

	async activityPositionStream(
		activityId: string,
	): Promise<StreamSetLatLngDistance> {
		// strava-v3 activity stream function has incorrect return type annotated, correct type defined
		return (await this.client.streams.activity({
			id: activityId,
			keys: ["latlng"],
			key_by_type: true,
		})) as unknown as StreamSetLatLngDistance;
	}
}
