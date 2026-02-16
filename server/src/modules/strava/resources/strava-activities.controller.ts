import { FastifyReply, FastifyRequest } from "fastify";
import { StravaActivitiesService } from "./strava-activities.service";

export const StravaActivitiesController = {
	getActivities: async (request: FastifyRequest, reply: FastifyReply) => {
		const stravaAuth = request.session.get("stravaAuth");
		if (!stravaAuth) {
			return reply
				.status(401)
				.send({ error: "Missing strava authentication" });
		}

		try {
			const activities =
				await StravaActivitiesService.getActivities(stravaAuth);
			reply.status(200).send(activities);
		} catch (error) {
			reply
				.status(500)
				.send({ error: `Error getting activities: ${error}` });
		}
	},
};
