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
 * Manual mapping of Strava sport types to high-contrast colors.
 * Only includes sports that typically have GPS/polyline data.
 * Avoids green and light gray to prevent conflicts with OpenStreetMap basemap.
 */
const SPORT_TYPE_COLOR_MAP: Record<string, string> = {
	// Running activities - red/orange spectrum (well-spaced)
	Run: "#FF0000", // Pure red
	TrailRun: "#FF4500", // Orange red
	VirtualRun: "#FF8C00", // Dark orange
	Walk: "#FF6347", // Tomato red

	// Cycling activities - distinct blues spread across spectrum (separate from water)
	Ride: "#0000FF", // Pure blue
	EBikeRide: "#0080FF", // Bright blue (between pure and cyan)
	GravelRide: "#0066FF", // Medium blue
	MountainBikeRide: "#0033CC", // Dark blue
	EMountainBikeRide: "#6633FF", // Blue-violet
	VirtualRide: "#4B0082", // Indigo (purple-blue)

	// Water activities - cyan/teal spectrum (distinct from cycling blues)
	Swim: "#00CED1", // Dark turquoise
	Kayaking: "#20B2AA", // Light sea green (teal)
	Canoeing: "#00FFFF", // Cyan
	Rowing: "#008B8B", // Dark cyan
	VirtualRow: "#48D1CC", // Medium turquoise
	StandUpPaddling: "#5F9EA0", // Cadet blue
	Surfing: "#00BFFF", // Deep sky blue
	Kitesurf: "#87CEEB", // Sky blue
	Windsurf: "#4682B4", // Steel blue
	Sail: "#008080", // Teal (darker, avoiding bright green)

	// Winter sports - purple/violet spectrum (distinct from cycling)
	AlpineSki: "#8A2BE2", // Blue violet
	BackcountrySki: "#9370DB", // Medium purple
	NordicSki: "#BA55D3", // Medium orchid
	Snowboard: "#9932CC", // Dark orchid
	Snowshoe: "#DA70D6", // Orchid
	IceSkate: "#7B68EE", // Medium slate blue

	// Hiking/outdoor - distinct red-brown
	Hike: "#A0522D", // Sienna (red-brown)

	// Wheeled activities with GPS - magenta/pink/orange spectrum
	Skateboard: "#FF1493", // Deep pink
	InlineSkate: "#FF69B4", // Hot pink
	RollerSki: "#FF00FF", // Magenta
	Handcycle: "#DC143C", // Crimson
	Wheelchair: "#C71585", // Medium violet red
	Velomobile: "#FF7F50", // Coral (distinct from TrailRun)
};

// Generic color for sports without GPS/polyline data (indoor, racquet sports, etc.)
const OTHER_SPORTS_COLOR = "#8B008B"; // Dark magenta - distinct from other colors

/**
 * Gets a high-contrast color for a sport type.
 * Uses manual mapping for GPS-enabled activities, assigns a generic color
 * for sports without GPS data, and falls back to hash-based generation
 * for unknown sport types.
 */
function sportColorMap(sportType: string): string {
	// Check manual mapping first (sports with GPS/polyline data)
	if (SPORT_TYPE_COLOR_MAP[sportType]) {
		return SPORT_TYPE_COLOR_MAP[sportType];
	}

	// Sports without GPS/polyline data get a generic "other" color
	const sportsWithoutGPS = [
		// Indoor fitness
		"Workout",
		"Crossfit",
		"Elliptical",
		"StairStepper",
		"WeightTraining",
		"Yoga",
		"Pilates",
		"HighIntensityIntervalTraining",
		// Racquet sports
		"Tennis",
		"Badminton",
		"Pickleball",
		"Squash",
		"Racquetball",
		"TableTennis",
		// Field/other sports
		"Golf",
		"Soccer",
		"RockClimbing",
	];

	if (sportsWithoutGPS.includes(sportType)) {
		return OTHER_SPORTS_COLOR;
	}

	// Fallback: hash-based color generation that avoids green and light gray
	let hash = 0;
	for (let i = 0; i < sportType.length; i++) {
		hash = (hash << 5) - hash + sportType.charCodeAt(i);
		hash = hash & hash;
	}

	// Generate colors in ranges that avoid green and light gray
	// Red: 200-255, Green: 50-150 (avoiding bright green), Blue: 100-255
	// This ensures bright, high-contrast colors
	const r = ((Math.abs(hash) >> 16) % 56) + 200; // 200-255
	const g = ((Math.abs(hash) >> 8) % 101) + 50; // 50-150 (avoiding bright green)
	const b = (Math.abs(hash) % 156) + 100; // 100-255

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
