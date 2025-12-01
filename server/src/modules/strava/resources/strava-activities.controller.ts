import { FastifyReply, FastifyRequest } from "fastify";
import { StravaActivitiesService } from "./strava-activities.service";

export const StravaActivitiesController = {
	syncActivities: async (request: FastifyRequest, reply: FastifyReply) => {
		const athleteId = request.cookies.athleteId;
		if (!athleteId || !parseInt(athleteId)) {
			reply.status(400).send("Bad or missing athlete ID");
			return;
		}

		try {
			await StravaActivitiesService.syncAthleteActivities(
				parseInt(athleteId),
				request.server.db,
			);
		} catch (error) {
			reply
				.status(500)
				.send({ error: `Error getting activities: ${error}` });
		}
		reply.status(200);
	},
};
