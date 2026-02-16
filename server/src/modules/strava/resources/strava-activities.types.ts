/**
 * Processed Strava activity interface that is returned to frontend
 */
export interface StravaActivity {
	id: string;
	athleteId: number;
	name: string;
	distance?: number;
	elapsedTime?: number;
	movingTime?: number;
	totalElevationGain?: number;
	sportType: string;
	sportTypeColour: string;
	startDate: Date;
	mapPolyline?: string;
	gearId?: string;
	description?: string;
}

export interface GetActivitiesResponse {
	activities: StravaActivity[];
	rateLimitExceeded: boolean;
	error: string;
}
