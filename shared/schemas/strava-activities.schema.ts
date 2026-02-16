import { Type, Static } from "@fastify/type-provider-typebox";

export const GetActivitiesParams = Type.Object({
	page: Type.Number(),
});

export const GetActivitiesSchema = Type.Object({
	activities: Type.Array(
		Type.Object({
			id: Type.String(),
			athleteId: Type.Number(),
			name: Type.String(),
			distance: Type.Optional(Type.Number()),
			elapsedTime: Type.Optional(Type.Number()),
			movingTime: Type.Optional(Type.Number()),
			totalElevationGain: Type.Optional(Type.Number()),
			sportType: Type.String(),
			sportTypeColour: Type.String(),
			startDate: Type.String({ format: "date-time" }),
			mapPolyline: Type.Optional(Type.String()),
			gearId: Type.Optional(Type.String()),
			description: Type.Optional(Type.String()),
		}),
	),
	rateLimitExceeded: Type.Boolean(),
	error: Type.String(),
});

/**
 * GET /api/activities response
 */
export type GetActivitiesResponse = Static<typeof GetActivitiesSchema>;

/**
 * Type of activity from GetActivitiesResponse
 */
export type StravaActivityRaw = Static<
	typeof GetActivitiesSchema.properties.activities.items
>;

/**
 * Parsed strava activities with decoded polyline points
 */
export type StravaActivity = StravaActivityRaw & {
	polylinePoints: [number, number][];
};
