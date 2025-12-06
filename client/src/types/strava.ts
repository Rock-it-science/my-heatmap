export interface Activity {
	id: number;
	name: string;
	athleteId: number;
	distance: number;
	totalElevationGain: number;
	sportType: string;
	startDate: Date;
	private: boolean;
}

export interface ActivityPolyline {
	// TODO Make this a contract that is synced with server code
	activityId: number;
	polylinePoints: [number, number][];
	name: string;
	sportType: string;
	color: string;
}
