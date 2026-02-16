import StravaApiV3, { DetailedActivityResponse } from "strava-v3";
import { StravaAuth } from "../../../types/strava.types";
import { StravaActivity } from "./strava-activities.types";

function mapSportColor(sportType: string): string {
	// TODO Expand this
	switch (sportType) {
		case "Ride":
			return "#FA8334";
		case "GravelRide":
			return "#fffd77";
		case "MountainBikeRide":
			return "#388697";
		case "hike":
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
	): Promise<StravaActivity[]> => {
		StravaApiV3.client(stravaAuth.accessToken.code);
		const athleteId = stravaAuth.athlete.id;

		// List all athlete activities
		let activityList: StravaActivity[] = [];
		let error = null;
		let pageCounter = 1;
		while (!error) {
			let activityRes: any[];
			try {
				activityRes = await StravaApiV3.athlete.listActivities({
					page: pageCounter,
				});
			} catch (e) {
				error = e;
				break;
			}
			pageCounter++;
			console.log(`Page ${pageCounter} of activities`);
			if (activityRes.length > 0) {
				for (const activity of activityRes) {
					activityList.push({
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
					});
				}
			} else {
				error = "No activities on page";
			}
		}

		console.log("Done listing activities");

		if (activityList.length > 0) {
			return activityList;
		} else {
			throw Error("Failed to find activities");
		}
	},
};
