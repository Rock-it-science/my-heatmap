import { StravaActivity, StravaActivityResponse } from "@/types";
import polyline from "@mapbox/polyline";
import { filterActivitiesEmptyMap } from "../map/activities/utils";

/**
 * Check if strava activities are in local storage.
 * If yes, fetch and return.
 * If no:
 * 	fetch from backend
 * 	decode polyline data
 * 	filter out activities with empty map data
 * 	store to local storage
 * @returns list of activity objects
 */
export async function fetchStravaActivities(): Promise<StravaActivity[]> {
	const localActivities = localStorage.getItem("stravaActivities");
	if (localActivities) {
		const parsedActivities = JSON.parse(localActivities);
		if (parsedActivities) {
			console.log("Using cached activities");
			return parsedActivities;
		}
	}
	console.log("Fetching activities from API");
	const response = await fetch("/api/activities");
	const stravaActivitiesResponse =
		(await response.json()) as StravaActivityResponse[];
	const stravaActivities = stravaActivitiesResponse.map((activity) => {
		const polylinePoints = activity.mapPolyline
			? polyline.decode(activity.mapPolyline)
			: undefined;
		return {
			polylinePoints,
			...activity,
		};
	});
	const filteredActivities = filterActivitiesEmptyMap(stravaActivities);
	localStorage.setItem(
		"stravaActivities",
		JSON.stringify(filteredActivities),
	);
	return filteredActivities;
}
