import { Type, Static } from "@fastify/type-provider-typebox";

export const GetActivity3dPositionsParams = Type.Object({
	activityId: Type.String(),
});

export const GetActivity3dPositionsSchema = Type.Object({
	activity3dPositions: Type.Optional(
		Type.Array(
			Type.Object({
				distance: Type.Number(),
				latitude: Type.Number(),
				longitude: Type.Number(),
				altitude: Type.Number(),
			}),
		),
	),
	rateLimitExceeded: Type.Boolean(),
	error: Type.Optional(Type.String()),
});

/**
 * GET /api/activity-3d-position response
 */
export type GetActivity3dPositionsResponse = Static<
	typeof GetActivity3dPositionsSchema
>;

/**
 * Type of activity3dPosition from GetActivity3dPositionResponse
 */
export type Activity3dPositions = Static<
	typeof GetActivity3dPositionsSchema.properties.activity3dPositions
>;
