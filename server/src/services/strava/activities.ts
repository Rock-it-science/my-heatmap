import StravaApiV3, { DetailedActivityResponse } from "strava-v3";
import { PrismaClient } from "../../../generated/prisma";

/**
 * Fetches detailed information about all (first 30) activities for the authenticated athlete and stores them in the database. Also returns the activities.
 * @param accessToken
 * @returns list of detailed activities
 */
export async function getAthleteActivities(
	athleteId: string,
	accessToken: string,
	prismaClient: PrismaClient | null,
) {
	StravaApiV3.client(accessToken);
	const activitiesRes = await StravaApiV3.athlete.listActivities({
		perPage: 3, // TODO This does not seem to do anything right now
	});
	// TODO Add pagination

	let activityDetails: DetailedActivityResponse[] = [];
	for (const activity of activitiesRes) {
		const activityRes: DetailedActivityResponse =
			await StravaApiV3.activities.get({
				id: activity.id,
			});
		activityDetails.push(activityRes);
		if (prismaClient) {
			const record = {
				id: parseInt(activityRes.id),
				athleteId: parseInt(athleteId),
				name: activityRes.name,
				distance: activityRes.distance,
				totalElevationGain: activityRes.total_elevation_gain,
				sportType: activityRes.sport_type,
				startDate: activityRes.start_date,
				mapPolyline: activityRes.map?.polyline,
				private: activityRes.private,
			};
			await prismaClient.stravaActivity.upsert({
				create: record,
				update: record,
				where: {
					id: record.id,
				},
			});
			console.log("Inserted activity to database");
		}
	}

	return activityDetails;
}
