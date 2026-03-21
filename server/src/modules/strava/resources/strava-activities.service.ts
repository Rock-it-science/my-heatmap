import StravaApi from "strava-v3";
import { StravaAuth } from "../../../types/strava.types";
import { GetActivitiesResponse } from "../../../../../shared/schemas/strava-activities.schema";

function mapSportColor(sportType: string): string {
	// TODO Expand this
	switch (sportType) {
		case "Ride":
			return "#FA8334";
		case "Gravel Ride":
			return "#fffd77";
		case "Mountain Bike Ride":
			return "#388697";
		case "Hike":
			return "#271033";
		default:
			return "#ffe882";
	}
}

export const StravaActivitiesService = {
	/**
	 * Loads detailed information about all activities for the authenticated athlete, decodes the polyline map data, categorizes the sport color, and returns as a list of objects.
	 * @param accessToken
	 * @returns list of detailed activities
	 */
	getActivities: async (
		stravaAuth: StravaAuth,
		page: number,
	): Promise<GetActivitiesResponse> => {
		const stravaClient = new StravaApi.client(stravaAuth.accessToken.code);
		const athleteId = stravaAuth.athlete.id;

		// List all athlete activities
		let activityRes: any[] | undefined;
		let error: string = "";
		try {
			activityRes = await stravaClient.athlete.listActivities({ page });
		} catch (e) {
			error = `Error listing activities for athlete ${athleteId}: ${e}`;
			console.log(error);
		}
		const rateLimitExceeded = stravaClient.rateLimiting.exceeded();

		// Early return if no data in response
		if (!activityRes) {
			return {
				activities: [],
				rateLimitExceeded,
				error,
			};
		}
		const activityList = activityRes.map((activity) => {
			return {
				id: activity.id,
				athleteId,
				name: activity.name,
				distance: activity.distance,
				elapsedTime: activity.elapsed_time,
				movingTime: activity.moving_time,
				totalElevationGain: activity.total_elevation_gain,
				sportType: activity.sport_type,
				sportTypeColour: mapSportColor(activity.sport_type),
				startDate: activity.start_date,
				mapPolyline: activity.map?.summary_polyline,
				gearId: activity.gear_id,
				description: activity.description,
			};
		});

		return {
			activities: activityList,
			rateLimitExceeded,
			error,
		};
	},
};
