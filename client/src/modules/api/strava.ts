import { StravaActivity, StravaActivityResponse } from "@/types";
import polyline from "@mapbox/polyline";

function getLocalActivitiesIfAvailable(): StravaActivity[] | false {
	const localActivities = localStorage.getItem("stravaActivities");
	if (localActivities) {
		const parsedActivities = JSON.parse(localActivities);
		if (parsedActivities) {
			console.log("Using cached activities");
			return parsedActivities;
		}
	}
	return false;
}

function storeActivities(filteredActivities: StravaActivity[]) {
	try {
		localStorage.setItem(
			"stravaActivities",
			JSON.stringify(filteredActivities),
		);
		return;
	} catch (error) {
		throw Error(`Error storing activities in local storage: ${error}`);
	}
}

async function fetchStravaActivitiesFromAPI(): Promise<
	StravaActivityResponse[]
> {
	console.log("Fetching activities from API");
	try {
		const response = await fetch("/api/activities");
		const stravaActivitiesResponse =
			(await response.json()) as StravaActivityResponse[];
		return stravaActivitiesResponse;
	} catch (error) {
		throw Error(`Error fetching activities from API: ${error}`);
	}
}

function decodePolylinePoints(
	stravaActivitiesResponse: StravaActivityResponse[],
): (StravaActivityResponse & { polylinePoints?: [number, number][] })[] {
	const stravaActivities = stravaActivitiesResponse.map((activity) => {
		const polylinePoints = activity.mapPolyline
			? polyline.decode(activity.mapPolyline)
			: undefined;
		return {
			polylinePoints,
			...activity,
		};
	});
	return stravaActivities;
}

function filterActivitiesEmptyMap(
	activities: (StravaActivityResponse & {
		polylinePoints?: [number, number][];
	})[],
): StravaActivity[] {
	return activities.filter(
		(activity) => activity.polylinePoints !== undefined,
	) as StravaActivity[];
}

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
	const localActivities = getLocalActivitiesIfAvailable();
	if (localActivities) {
		return localActivities;
	}

	const activitiesResponse = await fetchStravaActivitiesFromAPI();
	const activitiesDecodedPoints = decodePolylinePoints(activitiesResponse);
	const activitiesFiltered = filterActivitiesEmptyMap(
		activitiesDecodedPoints,
	);

	storeActivities(activitiesFiltered);

	return activitiesFiltered;
}
