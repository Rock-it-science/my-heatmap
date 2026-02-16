import { StravaActivity, StravaActivityResponse } from "@/types";
import polyline from "@mapbox/polyline";
import { filterActivitiesEmptyMap } from "./utils";

/**
 * Fetch strava activities from our backend and decode polyline data
 */
export async function fetchStravaActivities(): Promise<StravaActivity[]> {
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
	return filterActivitiesEmptyMap(stravaActivities);
}
