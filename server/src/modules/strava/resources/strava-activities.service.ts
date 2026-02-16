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
	getActivities: async (stravaAuth: StravaAuth) => {
		StravaApiV3.client(stravaAuth.accessToken.code);
		const athleteId = stravaAuth.athlete.id;

		// List all athlete activities
		let activityList: any[] = [];
		let error = null;
		let pageCounter = 1;
		while (!error) {
			const response = await StravaApiV3.athlete.listActivities({
				page: pageCounter,
			});
			pageCounter++;
			console.log(`Page ${pageCounter} of activities`);
			if (response.length > 1) {
				activityList.push(...response);
			} else {
				console.log(response);
				break;
			}
			break; // TODO For testing
		}

		console.log("Done listing activities");

		let stravaActivities: StravaActivity[] = [];
		for (const activity of activityList) {
			let activityRes: DetailedActivityResponse;
			try {
				activityRes = await StravaApiV3.activities.get({
					id: activity.id,
				});
			} catch (error) {
				console.log(
					`Failed fetching activity from strava, code: ${error}`,
				);
				break;
			}

			stravaActivities.push({
				id: activityRes.id,
				athleteId,
				name: activityRes.name,
				distance: activityRes.distance,
				elapsedTime: activityRes.elapsed_time,
				movingTime: activityRes.moving_time,
				totalElevationGain: activityRes.total_elevation_gain,
				sportType: activityRes.sport_type,
				sportTypeColour: mapSportColor(activityRes.sport_type),
				startDate: activityRes.start_date,
				mapPolyline: activityRes.map?.polyline,
				gearId: activityRes.gear_id,
				description: activityRes.description,
			});
		}

		return stravaActivities;
	},
};
