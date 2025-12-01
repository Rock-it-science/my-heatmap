import StravaApiV3, { DetailedActivityResponse } from "strava-v3";
import { PrismaClient } from "../../../../generated/prisma";
import { PrismaStravaTokenRepository } from "../auth/strava-auth.stores";

export const StravaActivitiesService = {
	/**
	 * Loads detailed information about all activities for the authenticated athlete and stores them in the database.
	 * @param accessToken
	 * @returns list of detailed activities
	 */
	syncAthleteActivities: async (
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

		StravaApiV3.client(accessToken.tokenCode);

		// List all athlete activities
		let activityList: any[] = [];
		let error = null;
		let pageCounter = 1;
		while (!error) {
			const response = await StravaApiV3.athlete.listActivities({
				page: pageCounter,
			});
			pageCounter++;
			console.log(`Page ${pageCounter} of activities`);
			if (response.length > 1) {
				activityList.push(...response);
			} else {
				console.log(response);
				break;
			}
		}

		console.log("Done loading activities");

		// For each activity, check if its already in the database, and if not fetch detailed information from Strava and insert to db
		const existingUserActivityIdsResult =
			await prismaClient.stravaActivity.findMany({
				select: { id: true },
				where: { athleteId },
			});
		const existingUserActivityIds = existingUserActivityIdsResult.map(
			(activityResult) => Number(activityResult.id),
		);
		let newActivities: any[] = [];
		for (const activity of activityList) {
			if (!existingUserActivityIds.includes(activity.id)) {
				let activityRes: DetailedActivityResponse;
				try {
					activityRes = await StravaApiV3.activities.get({
						id: activity.id,
					});
				} catch (error) {
					console.log(
						`Failed fetching activity from strava, code: ${error}`,
					);
					break;
				}
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
				newActivities.push(record);
			}
		}

		console.log(
			`Inserting ${newActivities.length} activities into database`,
		);
		try {
			await prismaClient.stravaActivity.createMany({
				data: newActivities,
			});
		} catch (error) {
			console.log(`Failed inserting to database: ${error}`);
		}

		const newCount = await prismaClient.stravaActivity.count({
			where: { athleteId },
		});
		console.log(
			`There are now ${newCount} records for this athlete in the database`,
		);

		return true;
	},
};
