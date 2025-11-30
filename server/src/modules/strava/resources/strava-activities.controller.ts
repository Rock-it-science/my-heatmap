import { FastifyReply, FastifyRequest } from "fastify";
import { StravaActivitiesService } from "./strava-activities.service";

export const StravaActivitiesController = {
	getActivities: async (request: FastifyRequest, reply: FastifyReply) => {
		const { athleteId } = request.query as { athleteId?: string };
		// TODO Use real schema validation
		if (!athleteId || !parseInt(athleteId)) {
			reply.status(400).send({ error: "athlete_id is required" });
			return;
		}

		let response;
		try {
			response = await StravaActivitiesService.getAthleteActivities(
				parseInt(athleteId),
				request.server.db,
			);
		} catch (error) {
			reply
				.status(500)
				.send({ error: `Error getting activities: ${error}` });
		}
		reply.status(200).send(response);
	},
};
