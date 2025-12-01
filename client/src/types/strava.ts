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
