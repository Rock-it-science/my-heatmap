import StravaApiV3, { DetailedActivityResponse } from "strava-v3";
import { PrismaClient } from "../../../../generated/prisma";
import { PrismaStravaTokenRepository } from "../auth/strava-auth.stores";

export const StravaActivitiesService = {
	/**
	 * Fetches detailed information about all (first 30) activities for the authenticated athlete and stores them in the database. Also returns the activities.
	 * @param accessToken
	 * @returns list of detailed activities
	 */
	getAthleteActivities: async (
		athleteId: number,
		prismaClient: PrismaClient | null,
	) => {
		if (!prismaClient) {
			throw Error("Database not initialized");
		}
		const tokenRepository = new PrismaStravaTokenRepository(prismaClient);
		// Get access token from database
		if (!tokenRepository) {
			throw Error("Could not find token repository");
		}

		const accessToken = await tokenRepository.getAccessToken(athleteId);

		if (!accessToken || !accessToken.tokenCode) {
			throw Error("No valid token found for athlete");
		}

		// Check if token is expired
		// if (new Date(accessToken.expires_at) < new Date()) {
		// 	reply
		// 		.status(401)
		// 		.send({ error: "Token expired, please re-authenticate" });
		// 	return;
		// }

		StravaApiV3.client(accessToken.tokenCode);
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
					athleteId: athleteId,
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
	},
};
