import path from "path";
import { readFileSync } from "fs";
import { fastify } from "fastify";
import { fastifyStatic } from "@fastify/static";
import { fastifyHttpProxy } from "@fastify/http-proxy";
import { fastifyCookie } from "@fastify/cookie";
import { fastifySession } from "@fastify/session";
import { StravaActivitiesController } from "./modules/strava/resources/strava-activities.controller";
import { StravaAuthController } from "./modules/strava/auth/strava-auth.controller";
import { InternalAuthController } from "./modules/api/auth/auth.controller";
import { activitiesController } from "./modules/api/activities/activities.controller";
import dbPlugin from "./plugins/db";

const server = fastify();

// Register plugins
server.register(fastifyCookie, {
	secret: process.env.COOKIE_SECRET || "32-character-dev-cookie-secret-yeah",
	hook: "onRequest",
});
server.register(dbPlugin);

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
server.get("/strava/auth", async (request, reply) =>
	reply.redirect(
		// TODO - set this to permanent domain - currently set to localhost because local IP not allowed by Strava
		"https://www.strava.com/oauth/authorize?client_id=175179&response_type=code&redirect_uri=http://localhost/strava/auth/callback&approval_prompt=force&scope=read,activity:read",
	),
);
server.get("/strava/auth/callback", StravaAuthController.stravaAuthCallback);
server.get("/strava/auth/refresh", StravaAuthController.refreshAuth);
server.get("/strava/activities", StravaActivitiesController.syncActivities);

/* App Auth */
server.get("/auth/login", InternalAuthController.login);
server.post("/auth/logout", InternalAuthController.logout);
server.get("/auth/status", InternalAuthController.status);

/* Internal API */
server.get("/api/activities", activitiesController.getActivities);
server.get(
	"/api/activities/polylines",
	activitiesController.getActivitiesPolylines,
);

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
