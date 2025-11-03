import StravaApiV3, { DetailedActivityResponse } from "strava-v3";
import { PrismaClient } from "../../../../prisma/generated/prisma";

/**
 * Fetches detailed information about all (first 30) activities for the authenticated athlete and stores them in the database
 * @param accessToken
 * @returns
 */
export async function getAthleteActivities(
	accessToken: string,
	prismaClient: PrismaClient | null,
) {
	StravaApiV3.client(accessToken);
	const activitiesRes = await StravaApiV3.athlete.listActivities({
		perPage: 30,
	});

	let activityDetails: DetailedActivityResponse[] = [];
	for (const activity of activitiesRes) {
		const activityRes = await StravaApiV3.activities.get({
			id: activity.id,
		});
		activityDetails.push(activityRes);
		if (prismaClient) {
			prismaClient.stravaActivity.create({
				data: {
					id: parseInt(activityRes.id),
					name: activitiesRes.name,
					athleteId: activitiesRes.athlete_id,
					distance: activitiesRes.distance,
					totalElevationGain: activitiesRes.total_elevation_gain,
					type: activitiesRes.type,
					sportType: activitiesRes.sport_type,
					startDate: activitiesRes.start_date,
					mapPolyline: activitiesRes.mapPolyline,
					private: activitiesRes.private,
				},
			});
		}
	}

	return activityDetails;
}
