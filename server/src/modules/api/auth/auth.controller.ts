import { FastifyReply, FastifyRequest } from "fastify";
import { AuthService } from "./auth.service";
import { StravaAuthService } from "../../strava/auth/strava-auth.service";
import { STRAVA_TOKEN_STATUSES } from "../../strava/auth/strava-auth.types";
import { StravaAuthController } from "../../strava/auth/strava-auth.controller";
import { getAthleteID } from "../../../utils/auth-utils";

export const InternalAuthController = {
	login: async (request: FastifyRequest, reply: FastifyReply) => {
		// Check if request already contains an athlete ID
		const athleteId = getAthleteID(request);
		if (!athleteId) {
			return reply
				.status(400)
				.send({ error: "Error logging in, no athlete ID" });
		}
		const tokenStatus = await StravaAuthService.getTokenStatus(
			athleteId,
			request.server.db,
		);
		switch (tokenStatus) {
			case STRAVA_TOKEN_STATUSES.ACTIVE:
				console.log("Auth - Existing session found");
				return reply.redirect("/heatmap");
			case STRAVA_TOKEN_STATUSES.EXPIRED:
				console.log("Auth - token expired, refreshing");
				return StravaAuthController.refreshAuth(request, reply);
			case STRAVA_TOKEN_STATUSES.MISSING:
				console.log(
					`Internal auth - athlete ${athleteId} missing token`,
				);
				return reply.status(400);
		}
	},
	logout: async (request: FastifyRequest, reply: FastifyReply) => {
		const athleteId = getAthleteID(request);

		if (!athleteId) {
			return reply
				.status(400)
				.send({ error: "Error logging out, no athlete ID" });
		}

		try {
			await AuthService.logout(athleteId, request.server.db);
			await request.session.destroy();
			return reply.status(200);
		} catch (error) {
			console.error("Logout error:", error);
			return reply.status(500).send({ error: "Failed to logout" });
		}
	},
	/**
	 * Checks if user currently has a valid log-in. Should not be used for security, only for arranging front-end components.
	 */
	status: async (request: FastifyRequest, reply: FastifyReply) => {
		const athleteId = getAthleteID(request);
		if (!athleteId) {
			return reply.send({ loggedIn: false });
		}
		const tokenStatus = await StravaAuthService.getTokenStatus(
			athleteId,
			request.server.db,
		);
		switch (tokenStatus) {
			case STRAVA_TOKEN_STATUSES.ACTIVE:
				return reply.send({ loggedIn: true });
			case STRAVA_TOKEN_STATUSES.EXPIRED:
			case STRAVA_TOKEN_STATUSES.MISSING:
				return reply.send({ loggedIn: false });
		}
	},
};
