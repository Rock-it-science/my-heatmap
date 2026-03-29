import polyline from "@mapbox/polyline";
import {
	Activity3dPositions,
	GetActivity3dPositionsResponse,
} from "shared/index";
import {
	GetActivitiesResponse,
	StravaActivity,
	StravaActivityRaw,
} from "shared/schemas/strava-activities.schema";

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

export async function fetchStravaActivitiesFromAPI(): Promise<
	StravaActivityRaw[]
> {
	console.log("Fetching activities from API");
	let rawActivities: StravaActivityRaw[] = [];
	let error;
	let page = 1;
	while (!error) {
		let response: Response;
		try {
			response = await fetch(`/api/activities?page=${page}`, {
				credentials: "include",
			});
		} catch (e) {
			error = e;
			break;
		}
		if (response.status !== 200) {
			error = `status ${response.status}`;
			break;
		}
		const stravaActivitiesResponse =
			(await response.json()) as GetActivitiesResponse;
		if (stravaActivitiesResponse.rateLimitExceeded) {
			error = "Rate limit exceeded";
		}
		if (stravaActivitiesResponse.error) {
			error = stravaActivitiesResponse.error;
			break;
		}
		if (stravaActivitiesResponse.activities.length === 0) {
			break;
		}
		rawActivities?.push(...stravaActivitiesResponse.activities);
		page++;
	}
	if (!rawActivities || rawActivities.length === 0) {
		throw Error(
			error
				? `Error fetching activities from API: ${error}`
				: "No activities found",
		);
	}
	if (error) {
		console.warn(`Received error after data: ${error}`);
	}
	return rawActivities;
}

export async function fetchStravaActivity3dPositionsFromAPI(
	activityId: string,
): Promise<Activity3dPositions> {
	console.log("Fetching activities from API");
	let error;
	const response = await fetch(
		`/api/activity-3d-positions?activityId=${activityId}`,
		{
			credentials: "include",
		},
	);
	if (response.status !== 200) {
		error = `status ${response.status}`;
	}
	const activity3dPositionsResponse =
		(await response.json()) as GetActivity3dPositionsResponse;
	if (activity3dPositionsResponse.rateLimitExceeded) {
		error = "Rate limit exceeded";
	}
	if (activity3dPositionsResponse.error) {
		error = activity3dPositionsResponse.error;
	}
	if (!activity3dPositionsResponse.activity3dPositions) {
		throw Error(
			error
				? `Error fetching activities from API: ${error}`
				: "No activities found",
		);
	}
	const Activity3dPositions = activity3dPositionsResponse.activity3dPositions;
	return Activity3dPositions;
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

export async function fetchActivity3dPositions(
	activityId: string,
): Promise<Activity3dPositions> {
	const activity3dPositions =
		await fetchStravaActivity3dPositionsFromAPI(activityId);
	// TODO Store in localstorage
	return activity3dPositions;
}
