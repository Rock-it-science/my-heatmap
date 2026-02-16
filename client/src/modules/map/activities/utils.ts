import { StravaActivity, StravaActivityResponse } from "@/types";

export function filterActivitiesEmptyMap(
	activities: (StravaActivityResponse & {
		polylinePoints?: [number, number][];
	})[],
): StravaActivity[] {
	return activities.filter(
		(activity) => activity.polylinePoints !== undefined,
	) as StravaActivity[];
}
