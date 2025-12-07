import { FastifyReply, FastifyRequest } from "fastify";
import { StravaAuthService } from "./strava-auth.service";
import { StravaCallbackRequest } from "./strava-auth.types";

export const StravaAuthController = {
	stravaAuthCallback: async (
		request: FastifyRequest,
		reply: FastifyReply,
	) => {
		const { state, code, scope, error } = (request as StravaCallbackRequest)
			.query;
		if (error) {
			console.log(error);
			reply.code(500).send({ error });
			return;
		}

		let response;
		try {
			response = await StravaAuthService.stravaAuthCallback(
				code,
				scope,
				request.server.db,
			);
			console.log(
				`Setting session athleteID to ${response.athleteId.toString()}`,
			);
			reply.setCookie("athleteId", response.athleteId.toString(), {
				path: "/",
				httpOnly: true,
				sameSite: "lax",
				secure: process.env.NODE_ENV === "production",
				maxAge: 60 * 60 * 48, // 48 hours
			});
			return reply.redirect("/heatmap");
		} catch (error) {
			const errorMessage = `Error exchanging authorization code for Strava access token: ${error}`;
			console.log(errorMessage);
			return reply.code(500).send({
				error: errorMessage,
			});
		}
	},
	refreshAuth: async (request: FastifyRequest, reply: FastifyReply) => {
		let athleteId;
		if (request.cookies.athleteId) {
			athleteId = parseInt(request.cookies.athleteId);
		}
		if (!athleteId) {
			throw Error(
				"Cannot refresh token because no athlete ID found in session",
			);
		}
		const success = await StravaAuthService.refreshAuth(
			athleteId,
			request.server.db,
		);
		if (success) {
			return reply.redirect("/auth/login");
		} else {
			return reply
				.code(500)
				.send({ message: "Failed to refresh auth token" });
		}
	},
};
