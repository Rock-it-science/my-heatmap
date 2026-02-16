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
			reply.status(500).send({ error });
			return;
		}

		try {
			const response = await StravaAuthService.stravaAuthCallback(
				code,
				scope,
			);

			const expiresAtDate = new Date(response.expires_at * 1000);
			request.session.set("stravaAuth", {
				accessToken: {
					code: response.access_token,
					expiresAt: expiresAtDate,
				},
				refreshToken: {
					code: response.refresh_token,
				},
				athlete: {
					id: response.athlete.id,
				},
			});
			return reply.redirect("/heatmap");
		} catch (error) {
			const errorMessage = `Error exchanging authorization code for Strava access token: ${error}`;
			console.log(errorMessage);
			return reply.status(500).send({
				error: errorMessage,
			});
		}
	},
	// refreshAuth: async (request: FastifyRequest, reply: FastifyReply) => {
	// 	let athleteId;
	// 	if (request.cookies.athleteId) {
	// 		athleteId = parseInt(request.cookies.athleteId);
	// 	}
	// 	if (!athleteId) {
	// 		throw Error(
	// 			"Cannot refresh token because no athlete ID found in session",
	// 		);
	// 	}
	// 	const success = await StravaAuthService.refreshAuth(
	// 		athleteId,
	// 	);
	// 	if (success) {
	// 		return reply.redirect("/auth/login");
	// 	} else {
	// 		return reply
	// 			.status(500)
	// 			.send({ message: "Failed to refresh auth token" });
	// 	}
	// },
	status: async (request: FastifyRequest, reply: FastifyReply) => {
		const stravaAuth = request.session.get("stravaAuth");
		if (
			stravaAuth &&
			stravaAuth.accessToken &&
			new Date(stravaAuth.accessToken.expiresAt).getTime() >
				new Date().getTime()
		) {
			return reply.send({ isLoggedIn: true });
		} else {
			return reply.send({ isLoggedIn: false });
		}
	},
};
