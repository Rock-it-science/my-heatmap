import { FastifyReply, FastifyRequest } from "fastify";
import { StravaActivitiesService } from "./strava-activities.service";

export const StravaActivitiesController = {
	getActivities: async (
		request: FastifyRequest<{ Querystring: { page: number } }>,
		reply: FastifyReply,
	) => {
		const { page } = request.query;
		const stravaAuth = request.session.get("stravaAuth");
		if (!stravaAuth) {
			return reply
				.status(401)
				.send({ error: "Missing strava authentication" });
		}

		try {
			const response = await StravaActivitiesService.getActivities(
				stravaAuth,
				page,
			);
			reply.status(200).send(response);
		} catch (error) {
			reply
				.status(500)
				.send({ error: `Error getting activities: ${error}` });
		}
	},
};
