import { FastifyReply, FastifyRequest } from "fastify";
import { activitiesService } from "./activities.service";
import { getAthleteID } from "../../../utils/auth-utils";

export const activitiesController = {
	getActivities: async (request: FastifyRequest, reply: FastifyReply) => {
		const athleteId = getAthleteID(request);
		if (!athleteId) {
			return reply
				.status(400)
				.send({ error: "Error logging out, no athlete ID" });
		}
		try {
			const response = await activitiesService.getActivities(
				athleteId,
				request.server.db,
			);
			reply.status(200).send(response);
		} catch (error) {
			reply.status(500).send({
				error: `Error fetching activities from app db: ${error}`,
			});
		}
	},
	getActivitiesPolylines: async (
		request: FastifyRequest,
		reply: FastifyReply,
	) => {
		const athleteId = getAthleteID(request);
		if (!athleteId) {
			reply.status(400).send("Bad or missing athlete ID");
			return;
		}
		let response;
		try {
			response = await activitiesService.getActivitiesPolylines(
				athleteId,
				request.server.db,
			);
			reply.status(200).send(response);
		} catch (error) {
			reply.status(500).send({
				error: `Error fetching activity polylines from app db: ${error}`,
			});
		}
	},
	getActivity: async (request: FastifyRequest, reply: FastifyReply) => {
		const { activityId } = request.query as { activityId: number | null };
		if (!activityId) {
			reply.status(400).send({ error: "Missing activity ID" });
			return;
		}
		const athleteId = getAthleteID(request);
		if (!athleteId) {
			reply.status(400).send({ error: "Bad or missing athlete ID" });
			return;
		}
		let response;
		try {
			response = await activitiesService.getActivity(
				activityId,
				request.server.db,
			);
			reply.status(200).send(response);
		} catch (error) {
			reply.status(500).send({
				error: `Error fetching activities from app db: ${error}`,
			});
		}
	},
};
