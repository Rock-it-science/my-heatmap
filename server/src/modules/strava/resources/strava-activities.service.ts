import StravaApi, { StreamSet } from "strava-v3";
import { StravaAuth } from "../../../types/strava.types";
import { GetActivitiesResponse } from "../../../../../shared/schemas/strava-activities.schema";
import {
	StravaAthleteProvider,
	StravaOAuthProvider,
} from "../../../providers/strava/StravaProviders";

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

/**
 * Take stream response and parse it into a list of 3D coordinates (lat, lng, altitude)
 */
function parseStreamResponse(
	streamSets: StreamSet[] | null,
): [number, number, number][] | undefined {
	if (!streamSets) {
		return undefined;
	}
	let pos3D: [number, number, number][] | undefined;
	const distanceStream = streamSets.find(
		(item) => item.type === "latlng",
	)?.data;
	const altitudeStream = streamSets.find(
		(item) => item.type === "altitude",
	)?.data;
	if (distanceStream && altitudeStream) {
		pos3D = distanceStream.map((item, index) => [
			item[0],
			item[1],
			altitudeStream[index],
		]);
	}
	return pos3D;
}

export class StravaActivitiesService {
	constructor(private stravaAthleteProvider: StravaAthleteProvider) {}

	/**
	 * Loads detailed information about all activities for the authenticated athlete, decodes the polyline map data, categorizes the sport color, and returns as a list of objects.
	 * @param accessToken
	 * @returns list of detailed activities
	 */
	async getActivities(page: number): Promise<GetActivitiesResponse> {
		const athleteId = this.stravaAthleteProvider.athleteId;

		// List all athlete activities
		let activityRes: any[] | undefined;
		let error: string = "";
		try {
			activityRes = await this.stravaAthleteProvider.listActivities(page);
		} catch (e) {
			error = `Error listing activities for athlete ${athleteId}: ${e}`;
			console.log(error);
		}
		const rateLimitExceeded =
			this.stravaAthleteProvider.rateLimitExceeded();

		// Early return if no data in response
		if (!activityRes) {
			return {
				activities: [],
				rateLimitExceeded,
				error,
			};
		}

		const activityList = await Promise.all(
			activityRes.map(async (activity) => {
				// Get activity stream
				let latLngAlt;
				if (!this.stravaAthleteProvider.rateLimitExceeded()) {
					const activityStream =
						await this.stravaAthleteProvider.activityPositionStream(
							activity.id,
						);
					latLngAlt = parseStreamResponse(activityStream);
				}
				// TODO Map stream elevation data?
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
					latLngAlt,
				};
			}),
		);

		return {
			activities: activityList,
			rateLimitExceeded,
			error,
		};
	}
}
