import "@fastify/secure-session";
import { StravaAuth } from "./strava.types";

declare module "@fastify/secure-session" {
	interface SessionData {
		stravaAuth: StravaAuth;
		// get<Key extends keyof SessionData>(key: Key): SessionData[Key];
		// set<Key extends keyof SessionData>(
		// 	key: Key,
		// 	value: SessionData[Key],
		// ): void;
		// has<Key extends keyof SessionData>(key: Key): boolean;
		// delete<Key extends keyof SessionData>(key: Key): void;
	}
}
