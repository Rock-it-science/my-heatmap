import strava, { RefreshTokenResponse, StravaClientInstance, SummaryActivity } from 'strava-v3';

const STRAVA_CONFIG = {
    access_token: "not set yet",
    client_id: process.env.STRAVA_CLIENT_ID,
    client_secret: process.env.STRAVA_CLIENT_SECRET,
    redirect_uri: "localhost",
}

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
        return await strava.oauth.getToken(authCode)
    }
    async refreshToken(refreshToken: string): Promise<RefreshTokenResponse> {
        return await strava.oauth.refreshToken(refreshToken)
    }
}

export class StravaAthleteProvider {
    private client: StravaClientInstance;

    constructor(accessToken: string) {
        this.client = new strava.client(accessToken);
    }

    async listActivities(page: number): Promise<SummaryActivity[]> {
        return await this.client.athlete.listActivities({ page })
    }

    rateLimitExceeded(): boolean {
        return this.client.rateLimiting.exceeded();
    }

}