import {
	Activity3dPositions,
	GetActivitiesResponse,
	GetActivity3dPositionsResponse,
} from "../../../../../shared";
import {
	StravaAthleteProvider,
	StreamSetAltitudeDistance,
	StreamSetLatLngDistance,
} from "../../../providers/strava/StravaProviders";

function mapSportColor(sportType: string): string {
	// TODO Expand this
	switch (sportType) {
		case "Ride":
			return "#FA8334";
		case "GravelRide":
			return "#fffd77";
		case "MountainBikeRide":
			return "#388697";
		case "Hike":
			return "#271033";
		default:
			return "#ffe882";
	}
}

/**
 * Parse stream response objects, and zip into a single output of 3D positions (latitude, longitude, altitude)
 * Assumptions:
 *  - Both inputs are truthy and have no missing data
 *  - All data attributes are of identical length, and correspond to the same distances
 *  - Distance values are sorted in ascending order (same as chronological order points were created)
 * @param activityAltitudeStream Activity stream of altitude for each distance position in the activity (altitude over distance)
 * @param activityPositionStream Activity stream of latitude and longitude positions for each distance position in the activity (lat/long over distance)
 * @returns List of 3D positions as [Latitude, Longitude, Altitude]
 */
export function parseStreamResponse(
	activityAltitudeStream: StreamSetAltitudeDistance,
	activityPositionStream: StreamSetLatLngDistance,
): Activity3dPositions | undefined {
	// Both stream inputs should be truthy and all data should be the same length
	if (!activityAltitudeStream || !activityPositionStream) {
		throw new Error("parseStreamResponse inputs cannot be nullish");
	}

	if (
		activityPositionStream.distance.data.length !==
			activityAltitudeStream.distance.data.length ||
		activityAltitudeStream.altitude.data.length !==
			activityPositionStream.latlng.data.length
	) {
		throw new Error(
			"parseStreamResponse input data arguments must be identical length",
		);
	}

	// Assume data is already sorted by distance, and sets are the same size - therefore can simply join by index (zip)
	let pos3D: Activity3dPositions | undefined;
	const distanceStream = activityPositionStream.distance.data;
	const positionStream = activityPositionStream.latlng.data;
	const altitudeStream = activityAltitudeStream.altitude.data;
	if (distanceStream && altitudeStream) {
		pos3D = positionStream.map((item, index) => ({
			distance: distanceStream[index],
			latitude: item[0],
			longitude: item[1],
			altitude: altitudeStream[index],
		}));
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

		activityRes = activityRes;
		const activityList = await Promise.all(
			activityRes.map(async (activity) => {
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
			}),
		);

		return {
			activities: activityList,
			rateLimitExceeded,
			error,
		};
	}

	async getActivity3dPositions(
		activityId: string,
	): Promise<GetActivity3dPositionsResponse> {
		// Get activity stream
		let latLngAlt;
		let error;
		if (!this.stravaAthleteProvider.rateLimitExceeded()) {
			try {
				const activityAltitudeStream =
					await this.stravaAthleteProvider.activityAltitudeStream(
						activityId,
					);
				const activityPositionStream =
					await this.stravaAthleteProvider.activityPositionStream(
						activityId,
					);
				latLngAlt = parseStreamResponse(
					activityAltitudeStream,
					activityPositionStream,
				);
			} catch (e) {
				error = e;
			}
		}
		if (latLngAlt) {
			return {
				activity3dPositions: latLngAlt,
				rateLimitExceeded:
					this.stravaAthleteProvider.rateLimitExceeded(),
			};
		} else {
			return {
				rateLimitExceeded:
					this.stravaAthleteProvider.rateLimitExceeded(),
				error,
			};
		}
	}
}
