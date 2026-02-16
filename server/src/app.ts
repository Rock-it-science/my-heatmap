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

// Get the directory paths - resolve from project root
const rootDir = path.resolve(process.cwd());
const clientDistPath = path.join(rootDir, "../client/dist"); // TODO this is different in docker and dev rn
const isDevelopment = process.env.NODE_ENV !== "production";
const VITE_DEV_SERVER_URL = "http://localhost:5173";

// Register proxy to Vite dev server in development, or static files in production
async function registerFrontendServing() {
	if (isDevelopment) {
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

// Catch-all route for SPA: serve index.html for all non-API routes
// This must be registered LAST so API routes take precedence
// Only needed in production (dev mode uses proxy)
if (!isDevelopment) {
	server.setNotFoundHandler(async (request, reply) => {
		// Don't serve index.html for API routes
		if (
			request.url.startsWith("/api") ||
			request.url.startsWith("/strava")
		) {
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
}

// Start the server
async function startServer() {
	try {
		// Register frontend serving (proxy in dev, static files in production)
		// This must be done after all API routes are registered
		await registerFrontendServing();

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
