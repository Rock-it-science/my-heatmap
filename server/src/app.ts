import path from "path";
import { readFileSync } from "fs";
import fastify from "fastify";
import fastifyStatic from "@fastify/static";
import { exchangeAuthCodeForToken } from "./services/strava/auth";
import { getAthleteActivities } from "./services/strava/activities";
import { StravaCallbackRequest } from "./services/strava/types";
import { PrismaStravaTokenRepository } from "./services/strava/token-repository";
import { PrismaClient } from "../generated/prisma";
import { request } from "http";
import polyline from "@mapbox/polyline";

const server = fastify();

// Get the directory paths - resolve from project root
const rootDir = path.resolve(process.cwd());
const clientDistPath = path.join(rootDir, "../client/dist"); // TODO this is different in docker and dev rn

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

// Register static file serving for the React app
// This must be registered AFTER API routes but BEFORE the catch-all route
async function registerStaticFiles() {
	await server.register(fastifyStatic, {
		root: clientDistPath,
	});
}

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
			athlete_id,
			accessToken.tokenCode,
			prismaClient,
		);

		// reply.send(activities);
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

// Probably rename this endpoint, but it will fetch existing activites that are in the db
server.get("/api/activities", async (request, reply) => {
	const { athlete_id } = request.query as { athlete_id?: string };
	if (athlete_id) {
		reply.status(200).send(
			// TODO this currently fails because bigint cannot be serialized to an API response
			await prismaClient?.stravaActivity.findMany({
				where: { athleteId: parseInt(athlete_id) },
			}),
		);
	} else {
		reply.code(400);
	}
});

server.get("/api/activities/polylines", async (request, reply) => {
	const { athlete_id } = request.query as { athlete_id?: string };
	if (athlete_id) {
		const polylinesEncoded = await prismaClient?.stravaActivity.findMany({
			select: { mapPolyline: true },
			where: { athleteId: parseInt(athlete_id) },
		});
		// TODO Move this to another function
		if (polylinesEncoded) {
			const latLongs: [number, number][][] = [];
			for (const polylineEncodedRecord of polylinesEncoded) {
				const polylineEncoded = polylineEncodedRecord.mapPolyline;
				if (polylineEncoded) {
					latLongs.push(polyline.decode(polylineEncoded));
				}
			}
			reply.status(200).send(latLongs);
		} else {
			reply.send(200).send({ message: "No data" });
		}
	} else {
		reply.code(400);
	}
});

// Catch-all route for SPA: serve index.html for all non-API routes
// This must be registered LAST so API routes take precedence
server.setNotFoundHandler(async (request, reply) => {
	// Don't serve index.html for API routes
	if (request.url.startsWith("/api") || request.url.startsWith("/strava")) {
		reply.status(404).send({ error: "Not found" });
		return;
	}

	// Serve index.html for all other routes (SPA fallback)
	try {
		const indexPath = path.join(clientDistPath, "index.html");
		const indexContent = readFileSync(indexPath, "utf-8");
		reply.type("text/html").send(indexContent);
	} catch (error) {
		console.log(error.message);
		reply.status(404).send({
			error: "Frontend not found. Please build the client first.",
		});
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

		// Register static file serving for the React app
		// This must be done after all API routes are registered
		await registerStaticFiles();

		// Start the server
		const address = await server.listen({ port: 8085, host: "0.0.0.0" });
		console.log(`Server listening at ${address}`);
		console.log(`Serving static files from: ${clientDistPath}`);
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
