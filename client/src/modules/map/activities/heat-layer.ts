import { StravaActivity } from "@/types";
import * as L from "leaflet";

/**
 * Create heatmap layer from activity polyline geo data
 */
export function createHeatLayer(activityPolyLines: StravaActivity[]) {
	let allCoords: [number, number, number][] = [];
	for (const activity of activityPolyLines) {
		if (activity.polylinePoints) {
			for (const activityPoint of activity.polylinePoints) {
				allCoords.push([activityPoint[0], activityPoint[1], 0.35]); // X, Y, Intensity
			}
		}
	}

	return L.heatLayer(allCoords, {
		radius: 12,
	});
}
