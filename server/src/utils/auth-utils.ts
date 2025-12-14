import { FastifyRequest } from "fastify";

/**
 * Parses athlete ID from cookie
 */
export function getAthleteID(request: FastifyRequest): number | null {
	if (request.cookies.athleteId && parseInt(request.cookies.athleteId)) {
		return parseInt(request.cookies.athleteId);
	} else {
		return null;
	}
}
