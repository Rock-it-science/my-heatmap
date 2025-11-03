// import path from "path";
import fastify from "fastify";
// import fastifyStatic from "@fastify/static";
import { exchangeAuthCodeForToken } from "./services/strava/auth";
import { getAthleteActivities } from "./services/strava/activities";
import { StravaCallbackRequest } from "./services/strava/types";
import { PrismaStravaTokenRepository } from "./services/strava/token-repository";
import { PrismaClient } from "../../prisma/generated/prisma";

const server = fastify();
const root = "/app/dist";

let prismaClient: PrismaClient | null = null;
let tokenRepository: PrismaStravaTokenRepository | null = null;

async function initializeDatabase() {
	try {
		prismaClient = new PrismaClient();
		tokenRepository = new PrismaStravaTokenRepository(prismaClient);

		return true;
	} catch (error) {
		console.error("Failed to initialize database:", error);
		return false;
	}
}

// server.register(fastifyStatic, {
// 	root: path.join(root, "/frontend"),
// 	prefix: "/",
// 	logLevel: "debug",
// });

/* Frontend routes */
// Initiates auth, redirects to Strava
server.get("/strava/auth", async (request, reply) =>
	reply.redirect(
		// TODO - set this to permanent domain - currently set to localhost because local IP not allowed by Strava
		"https://www.strava.com/oauth/authorize?client_id=175179&response_type=code&redirect_uri=http://localhost/strava/auth/callback&approval_prompt=force&scope=read,activity:read",
	),
);

// Callback after Strava sign-in success
server.get(
	"/strava/auth/callback",
	async (request: StravaCallbackRequest, reply) => {
		const { state, code, scope, error } = request.query;
		if (error) {
			reply.redirect("/auth/error");
			return;
		}
		console.log(
			`Received from callback: ${state}, ${code}, ${scope}, ${error}`,
		);

		// Exchange authorization code for short-lived access token and refresh token
		try {
			const tokenResponse = await exchangeAuthCodeForToken(code);
			// Store tokens in database
			if (!tokenRepository) {
				reply.status(500).send({ error: "Database not initialized" });
				return;
			}

			const success = await tokenRepository.storeTokens(
				{
					athleteId: tokenResponse.athlete.id,
					scope: scope ?? "read",
					tokenCode: tokenResponse.access_token,
					expiresAt: BigInt(tokenResponse.expires_at),
				},
				{
					athleteId: tokenResponse.athlete.id,
					tokenCode: tokenResponse.refresh_token,
					scope: scope || "read",
				},
			);

			if (!success) {
				console.error("Failed to store tokens");
				reply.redirect("/auth/error");
				return;
			}

			// Store athlete_id in session/cookie for future requests
			// For now, we'll redirect with it in the URL (not ideal for production)
			reply.redirect(
				`/strava/activities?athlete_id=${tokenResponse.athlete.id}`,
			);
		} catch (error) {
			console.error("Auth callback error:", error);
			reply.redirect("/auth/error");
		}
	},
);

server.get("/auth/error", (request, reply) => {
	// TODO Error page
	reply.send("Strava auth error");
});

server.get("/dashboard", async (request, reply) => {
	// TODO Make a dasbhaord with buttons and stuff, for now just show activities that we got
	reply.redirect("/strava/activities");
});

// server.get("/heatmap-test", (request, reply) => {
// 	reply.sendFile("assets/heatmap.html");
// });

/* Backend API Routes */
server.post("/api/strava/auth", async () => {
	// Exchange auth code for token
});

server.post("/api/auth/refresh", async () => {
	// Refresh token
});

server.get("/strava/activities", async (request, reply) => {
	const { athlete_id } = request.query as { athlete_id?: string };

	if (!athlete_id) {
		reply.status(400).send({ error: "athlete_id is required" });
		return;
	}
	console.log(`Athlete ID: ${athlete_id}`);

	try {
		// Get access token from database
		if (!tokenRepository) {
			reply.status(500).send({ error: "Database not initialized" });
			return;
		}

		const accessToken = await tokenRepository.getAccessToken(
			parseInt(athlete_id),
		);

		if (!accessToken || !accessToken.tokenCode) {
			reply
				.status(401)
				.send({ error: "No valid token found for athlete" });
			return;
		}

		// Check if token is expired
		// if (new Date(accessToken.expires_at) < new Date()) {
		// 	reply
		// 		.status(401)
		// 		.send({ error: "Token expired, please re-authenticate" });
		// 	return;
		// }

		// Get activities using the stored token
		const activities = await getAthleteActivities(
			accessToken.tokenCode,
			prismaClient,
		);
		reply.send(activities);
	} catch (error) {
		console.error("Error getting activities:", error.message);
		reply.status(500).send({ error: "Failed to get activities" });
	}
});

server.post("/api/auth/logout", async (request, reply) => {
	const { athlete_id } = request.body as { athlete_id?: number };

	if (!athlete_id) {
		reply.status(400).send({ error: "athlete_id is required" });
		return;
	}

	try {
		if (!tokenRepository) {
			reply.status(500).send({ error: "Database not initialized" });
			return;
		}

		const success = await tokenRepository.deleteTokens(athlete_id);
		if (success) {
			reply.send({ message: "Successfully logged out" });
		} else {
			reply.status(500).send({ error: "Failed to logout" });
		}
	} catch (error) {
		console.error("Logout error:", error);
		reply.status(500).send({ error: "Failed to logout" });
	}
});

// Start the server
async function startServer() {
	try {
		// Initialize database first
		const dbInitialized = await initializeDatabase();
		if (!dbInitialized) {
			console.error("Failed to initialize database. Exiting...");
			process.exit(1);
		}

		// Start the server
		const address = await server.listen({ port: 8085, host: "0.0.0.0" });
		console.log(`Server listening at ${address}`);
	} catch (err) {
		console.error("Failed to start server:", err);
		process.exit(1);
	}
}

// Graceful shutdown handling
async function gracefulShutdown(signal: string) {
	console.log(`Received ${signal}. Gracefully shutting down...`);

	try {
		await server.close();
		if (prismaClient) {
			await prismaClient.$disconnect();
		}
		console.log("Server shut down successfully");
		process.exit(0);
	} catch (error) {
		console.error("Error during shutdown:", error);
		process.exit(1);
	}
}

process.on("SIGINT", () => gracefulShutdown("SIGINT"));
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));

// Start the server
startServer();
