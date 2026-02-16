import path from "path";
import { readFileSync } from "fs";
import { fastify } from "fastify";
import { fastifyStatic } from "@fastify/static";
import { fastifyHttpProxy } from "@fastify/http-proxy";
import { fastifySecureSession } from "@fastify/secure-session";
import { StravaActivitiesController } from "./modules/strava/resources/strava-activities.controller";
import { StravaAuthController } from "./modules/strava/auth/strava-auth.controller";
import { STRAVA_OAUTH_URL } from "./types/constants";
import * as fs from "node:fs";
import dotenv from "dotenv";

dotenv.config();
const server = fastify();

// Register plugins
server.register(fastifySecureSession, {
	key: fs.readFileSync(path.join(__dirname, "secret-key")),
	secret: process.env.SESSION_SECRET,
	salt: process.env.SESSION_SALT,
	cookie: {
		path: "/",
		httpOnly: true,
		secure: true,
	},
});

// Register proxy to Vite dev server in development
async function registerFrontendServing() {
	const isDevelopment = process.env.NODE_ENV !== "production";
	const rootDir = path.resolve(process.cwd());
	const clientDistPath = path.join(rootDir, "../client/dist"); // TODO this is different in docker and dev rn

	if (isDevelopment) {
		const VITE_DEV_SERVER_URL = "http://localhost:5173";

		// In development, register a catch-all route that proxies to Vite
		// This must be registered AFTER all API routes so they take precedence
		// Fastify matches routes in registration order, so API routes will be matched first
		await server.register(fastifyHttpProxy, {
			upstream: VITE_DEV_SERVER_URL,
			prefix: "/",
			rewritePrefix: "/",
		});
		console.log(
			`Proxying frontend requests to Vite dev server at ${VITE_DEV_SERVER_URL}`,
		);
	} else {
		// In production, serve static files
		await server.register(fastifyStatic, {
			root: clientDistPath,
		});
		console.log(`Serving static files from: ${clientDistPath}`);
	}
}

/* Strava Routes */
server.get("/api/user/auth", async (_request, reply) =>
	reply.redirect(
		// TODO - set this to permanent domain - currently set to localhost because local IP not allowed by Strava
		STRAVA_OAUTH_URL,
	),
);
server.get("/api/user/auth/callback", StravaAuthController.stravaAuthCallback);
server.get("/api/user/auth/refresh", StravaAuthController.refreshAuth);
server.get("/api/user/auth/status", StravaAuthController.status);
server.get("/api/activities", StravaActivitiesController.getActivities);

async function startServer() {
	try {
		// await registerFrontendServing();

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
