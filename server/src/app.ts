import { fastify } from "fastify";
import { fastifySecureSession } from "@fastify/secure-session";
import cors from "@fastify/cors";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { StravaActivitiesController } from "./modules/strava/resources/strava-activities.controller";
import { StravaAuthController } from "./modules/strava/auth/strava-auth.controller";
import dotenv from "dotenv";
import {
	GetActivitiesParams,
	GetActivitiesSchema,
} from "../../shared/schemas/strava-activities.schema";

dotenv.config();
const server = fastify({
	trustProxy: true,
}).withTypeProvider<TypeBoxTypeProvider>();

server.register(fastifySecureSession, {
	cookieName: "__session",
	key: Buffer.from(process.env.SESSION_SECRET as string, "hex"),
	cookie: {
		path: "/",
		httpOnly: true,
		secure: true,
		sameSite: "none",
	},
});
server.register(cors, {
	origin: process.env.FRONTEND_URL,
	methods: ["GET"],
	allowedHeaders: ["Content-Type", "Authorization"],
	credentials: true,
});

/* Routes */
server.get("/api/auth", StravaAuthController.stravaAuthRedirect);
server.get("/api/auth/callback", StravaAuthController.stravaAuthCallback);
server.get("/api/auth/refresh", StravaAuthController.refreshAuth);
server.get("/api/auth/status", StravaAuthController.status);

server.get("/api/activities", {
	schema: {
		querystring: GetActivitiesParams,
		response: {
			200: GetActivitiesSchema,
		},
	},
	handler: StravaActivitiesController.getActivities,
});

async function startServer() {
	try {
		const address = await server.listen({ port: 8085, host: "0.0.0.0" });
		console.log(`Server listening at ${address}`);
	} catch (err) {
		console.error("Failed to start server:", err);
		process.exit(1);
	}
}

async function gracefulShutdown(signal: string) {
	console.log(`Received ${signal}. Gracefully shutting down...`);

	try {
		await server.close();
		console.log("Server shut down successfully");
		process.exit(0);
	} catch (error) {
		console.error("Error during shutdown:", error);
		process.exit(1);
	}
}

process.on("SIGINT", () => gracefulShutdown("SIGINT"));
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));

startServer();
