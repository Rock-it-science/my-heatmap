export interface ActivityPolyline {
	// TODO Make this a contract that is synced with server code
	activityId: number;
	polylinePoints: [number, number][];
	name: string;
	sportType: string;
	color: string;
}

/**
 * Response type for GET `/api/activity?activityId=:actvityId`
 * TODO - Sync this with backend using a common type file
 */
export interface DetailedActivityResponse {
	id: bigint;
	name: string;
	athleteId: bigint;
	distance: number | null;
	totalElevationGain: number | null;
	sportType: string;
	startDate: Date;
	private: boolean | null;
}
