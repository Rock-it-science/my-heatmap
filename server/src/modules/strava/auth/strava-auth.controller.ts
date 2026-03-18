import { FastifyReply, FastifyRequest } from "fastify";
import { StravaAuthService } from "./strava-auth.service";
import { StravaCallbackRequest } from "./strava-auth.types";

export const StravaAuthController = {
	stravaAuthRedirect: async (
		_request: FastifyRequest,
		reply: FastifyReply,
	) => {
		reply.redirect(
			// TODO - set this to permanent domain - currently set to localhost because local IP not allowed by Strava
			`https://www.strava.com/oauth/authorize?client_id=175179&response_type=code&redirect_uri=${process.env.FRONTEND_URL}/api/auth/callback&approval_prompt=force&scope=read,activity:read`,
		);
	},
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
			return reply.redirect(`${process.env.FRONTEND_URL}/heatmap`);
		} catch (error) {
			const errorMessage = `Error exchanging authorization code for Strava access token: ${error}`;
			console.log(errorMessage);
			return reply.status(500).send({
				error: errorMessage,
			});
		}
	},
	refreshAuth: async (request: FastifyRequest, reply: FastifyReply) => {
		const stravaAuth = request.session.get("stravaAuth");
		if (!stravaAuth) {
			return reply.status(500).send({ error: "Mising auth data" });
		}
		try {
			const newToken = await StravaAuthService.refreshAuth(stravaAuth);
			const athleteId = stravaAuth.athlete.id;
			request.session.set("stravaAuth", {
				accessToken: {
					code: newToken.accessToken,
					expiresAt: new Date(newToken.expiresAt * 1000),
				},
				refreshToken: {
					code: newToken.refreshToken,
				},
				athlete: {
					id: athleteId,
				},
			});
			return reply.redirect("/auth/login");
		} catch (error) {
			console.log(`Error refreshing auth token: ${error}`);
			return reply
				.status(500)
				.send({ error: "Failed to refresh auth token" });
		}
	},
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
