import { StravaActivity } from "shared/index";
import L from "../leaflet-setup";
import { createActivityPopup } from "./activity-popup";

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

export function createActivityLinesLayerGroup(
	activityPolyLines: StravaActivity[],
): L.LayerGroup<L.Polyline & { sportType: string }> {
	const activityLineLayers = activityPolyLines.map((activityPolyline) => {
		const activityLineLayer = L.polyline(activityPolyline.polylinePoints, {
			color: activityPolyline.sportTypeColour,
			opacity: 0.2,
		});
		(activityLineLayer as any).sportType = activityPolyline.sportType;
		activityLineLayer.bindPopup(
			() => createActivityPopup(activityPolyline),
			{
				minWidth: 200,
			},
		);
		return activityLineLayer;
	});
	const activityLinesLayerGroup = L.layerGroup(activityLineLayers);
	return activityLinesLayerGroup;
}
