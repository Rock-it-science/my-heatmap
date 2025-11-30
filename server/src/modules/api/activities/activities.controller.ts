import { FastifyReply, FastifyRequest } from "fastify";
import { activitiesService } from "./activities.service";

export const activitiesController = {
	getActivities: async (request: FastifyRequest, reply: FastifyReply) => {
		const { athlete_id } = request.query as { athlete_id?: string };
		if (!athlete_id || !parseInt(athlete_id)) {
			reply.status(400).send({ error: "Bad or missing athlete ID" });
			return;
		}
		let response;
		try {
			response = await activitiesService.getActivities(
				parseInt(athlete_id),
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
		const athleteId = request.session.athleteId;
		if (!athleteId || !parseInt(athleteId)) {
			reply.status(400).send("Bad or missing athlete ID");
			return;
		}
		let response;
		try {
			response = await activitiesService.getActivitiesPolylines(
				parseInt(athleteId),
				request.server.db,
			);
			reply.code(200).send(response);
		} catch (error) {
			reply.status(500).send({
				error: `Error fetching activity polylines from app db: ${error}`,
			});
		}
	},
};
