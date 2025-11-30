import { PrismaClient } from "../../../../generated/prisma";
import polyline from "@mapbox/polyline";

export const activitiesService = {
	getActivities: async (athleteId: number, prismaClient: PrismaClient) => {
		// TODO this currently fails because bigint cannot be serialized to an API response
		return await prismaClient?.stravaActivity.findMany({
			where: { athleteId: athleteId },
		});
	},
	getActivitiesPolylines: async (
		athleteId: number,
		prismaClient: PrismaClient,
	) => {
		const polylinesEncoded = await prismaClient?.stravaActivity.findMany({
			select: { mapPolyline: true },
			where: { athleteId: athleteId },
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
			return latLongs;
		}
		return;
	},
};
