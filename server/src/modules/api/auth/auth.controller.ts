import { FastifyReply, FastifyRequest } from "fastify";
import { AuthService } from "./auth.service";
import { StravaAuthService } from "../../strava/auth/strava-auth.service";
import { STRAVA_TOKEN_STATUSES } from "../../strava/auth/strava-auth.types";

export const InternalAuthController = {
	login: async (request: FastifyRequest, reply: FastifyReply) => {
		// Check if request already contains an athlete ID
		let athleteId;
		if (request.cookies.athleteId) {
			console.log(
				`Logging in - found session ID: ${request.cookies.athleteId}`,
			);
			athleteId = parseInt(request.cookies.athleteId);
		}
		if (athleteId) {
			const tokenStatus = await StravaAuthService.getTokenStatus(
				athleteId,
				request.server.db,
			);
			switch (tokenStatus) {
				case STRAVA_TOKEN_STATUSES.ACTIVE:
					console.log("Auth - Existing session found");
					reply.redirect("/heatmap");
					break;
				case STRAVA_TOKEN_STATUSES.EXPIRED:
					console.log("Auth - token expired, refreshing");
					reply.redirect("/strava/auth/refresh");
					break;
				case STRAVA_TOKEN_STATUSES.MISSING:
					console.log(
						`Internal auth - athlete ${athleteId} missing token`,
					);
					break;
			}
		}
		console.log("No existing session found");
		return reply.redirect("/strava/auth");
	},
	logout: async (request: FastifyRequest, reply: FastifyReply) => {
		const { athlete_id } = request.body as { athlete_id?: number };

		if (!athlete_id) {
			return reply.status(400).send({ error: "athlete_id is required" });
		}

		try {
			await AuthService.logout(athlete_id, request.server.db);
			await request.session.destroy();
		} catch (error) {
			console.error("Logout error:", error);
			return reply.status(500).send({ error: "Failed to logout" });
		}
	},
};
