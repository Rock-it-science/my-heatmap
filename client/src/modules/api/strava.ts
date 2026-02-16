import polyline from "@mapbox/polyline";
import {
	GetActivitiesResponse,
	StravaActivity,
	StravaActivityRaw,
} from "@shared/schemas/strava-activities.schema";

export function getLocalActivitiesIfAvailable(): StravaActivity[] | false {
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

async function fetchStravaActivitiesFromAPI(): Promise<StravaActivityRaw[]> {
	console.log("Fetching activities from API");
	let rawActivities: StravaActivityRaw[] | undefined;
	let error;
	let page = 1;
	while (!error) {
		try {
			const response = await fetch(`/api/activities?page=${page}`);
			if (response.status !== 200) {
				error = `Error fetching activities from API, status ${response.status}`;
			}
			const stravaActivitiesResponse =
				(await response.json()) as GetActivitiesResponse;
			rawActivities?.push(...stravaActivitiesResponse.activities);
			if (stravaActivitiesResponse.rateLimitExceeded) {
				error = "Rate limit exceeded";
			}
			if (stravaActivitiesResponse.error) {
				error = stravaActivitiesResponse.error;
			}
			if (stravaActivitiesResponse.activities.length === 0) {
				break;
			}
			page++;
		} catch (e) {
			error = `Error fetching activities from API: ${e}`;
		}
	}
	if (!rawActivities || rawActivities.length === 0) {
		throw Error(error ?? "No activities found");
	}
	if (error) {
		console.warn(`Partial ${error}`);
	}
	return rawActivities;
}

function decodePolylinePoints(
	stravaActivitiesResponse: StravaActivityRaw[],
): (StravaActivityRaw & { polylinePoints?: [number, number][] })[] {
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
	activities: (StravaActivityRaw & {
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
