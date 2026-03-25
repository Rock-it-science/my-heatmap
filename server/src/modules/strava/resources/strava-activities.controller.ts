import { FastifyReply, FastifyRequest } from "fastify";
import { StravaActivitiesService } from "./strava-activities.service";
import { StravaAthleteProvider } from "../../../providers/strava/StravaProviders";

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
			const stravaAthleteProvider = new StravaAthleteProvider(stravaAuth);
			const stravaActivitiesService = new StravaActivitiesService(
				stravaAthleteProvider,
			);
			const response = await stravaActivitiesService.getActivities(page);
			reply.status(200).send(response);
		} catch (error) {
			reply
				.status(500)
				.send({ error: `Error getting activities: ${error}` });
		}
	},
	getActivity3dPositions: async (
		request: FastifyRequest<{ Querystring: { activityId: string } }>,
		reply: FastifyReply,
	) => {
		const { activityId } = request.query;
		const stravaAuth = request.session.get("stravaAuth");
		if (!stravaAuth) {
			return reply
				.status(401)
				.send({ error: "Missing strava authentication" });
		}

		try {
			const stravaAthleteProvider = new StravaAthleteProvider(stravaAuth);
			const stravaActivitiesService = new StravaActivitiesService(
				stravaAthleteProvider,
			);
			const response =
				await stravaActivitiesService.getActivity3dPositions(
					activityId,
				);
			reply.status(200).send(response);
		} catch (error) {
			reply.status(500).send({
				error: `Error getting activity 3D positions: ${error}`,
			});
		}
	},
};
