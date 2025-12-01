import { PrismaClient } from "../../../../generated/prisma";
import polyline from "@mapbox/polyline";

interface Activity {
	activityId?: number;
	polylinePoints?: [number, number][];
	name?: string;
	sportType?: string;
	color?: string;
	// density?: number;
}

/**
 * Generates a unique, consistent color for each sport type by hashing the string.
 * This ensures each sport type gets a distinct color without manual mapping.
 */
function sportColorMap(sportType: string): string {
	let hash = 0;
	for (let i = 0; i < sportType.length; i++) {
		hash = (hash << 5) - hash + sportType.charCodeAt(i);
		hash = hash & hash;
	}

	// Use hash bits directly for RGB, keeping values in good range (80-255)
	const r = ((Math.abs(hash) >> 16) % 176) + 80;
	const g = ((Math.abs(hash) >> 8) % 176) + 80;
	const b = (Math.abs(hash) % 176) + 80;

	return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

// /**
//  * Determine overlap of activities and return list of activities with a density value assigned.
//  * Density will be greater at points where there is overlap with other activities
//  */
// function polylineOverlap(activitiesXY: Activity[]) {
// 	// Round all cooardinates to the nearest 10m
// 	// Compare points across activities to determine overlap
// }

export const activitiesService = {
	getActivities: async (athleteId: number, prismaClient: PrismaClient) => {
		const activities = await prismaClient?.stravaActivity.findMany({
			omit: { mapPolyline: true },
			where: { athleteId: athleteId },
		});
		return activities?.map(({ id, athleteId, ...activity }) => ({
			id: Number(id),
			athleteId: Number(athleteId),
			...activity,
		}));
	},
	/**
	 * Get activities for an athlete and decode the encoded polyline string into lat and long coordinates. Also includes some other basic data about the activity
	 * @returns
	 */
	getActivitiesPolylines: async (
		athleteId: number,
		prismaClient: PrismaClient,
	) => {
		const polylinesEncoded = await prismaClient?.stravaActivity.findMany({
			select: {
				id: true,
				mapPolyline: true,
				sportType: true,
				name: true,
			},
			where: { athleteId: athleteId },
		});
		// TODO Move this to another function
		if (polylinesEncoded) {
			let activitiesXY: Activity[] = [];
			for (const polylineEncodedRecord of polylinesEncoded) {
				const polylineEncoded = polylineEncodedRecord.mapPolyline;
				if (polylineEncoded) {
					activitiesXY.push({
						activityId: Number(polylineEncodedRecord.id),
						polylinePoints: polyline.decode(polylineEncoded),
						sportType: polylineEncodedRecord.sportType,
						name: polylineEncodedRecord.name,
						color: sportColorMap(polylineEncodedRecord.sportType),
					});
				}
			}
			return activitiesXY;
		}
		return;
	},
};
