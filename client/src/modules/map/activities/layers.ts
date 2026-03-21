import { StravaActivity } from "shared/index";
import L from "../leaflet-setup";
import { createActivityPopup } from "./activity-popup";

const DEFAULT_OPACITY = 0.2;

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
		const activityLineLayer: L.Polyline & { sportType?: string } = L.polyline(activityPolyline.polylinePoints, {
			color: activityPolyline.sportTypeColour,
			opacity: DEFAULT_OPACITY,
		});
		activityLineLayer.sportType = activityPolyline.sportType;
		activityLineLayer.bindPopup(
			() => createActivityPopup(activityPolyline),
			{
				minWidth: 200,
			},
		);

		setActivityLineEvents(activityLineLayer);

		return activityLineLayer;
	});
	const activityLinesLayerGroup = L.layerGroup(activityLineLayers);
	return activityLinesLayerGroup;
}

/**
 * Set activity line event listeners to raise opacity and weight of lines when they are hovered over, or when popup is open.
 * Mouse-out should not clear changes if popup is open (activity line should stay boldened as long as popup is open)
 */
function setActivityLineEvents(activityLineLayer: L.Polyline & { sportType?: string }) {
	let isPopupOpen = false;
	activityLineLayer.on("popupopen", (ev) => {
		isPopupOpen = true;
		(ev.target as L.Polyline).setStyle({ weight: 6, opacity: 1 })
	}
	);
	activityLineLayer.on("popupclose", (ev) => {
		isPopupOpen = false;
		(ev.target as L.Polyline).setStyle({ weight: 3, opacity: DEFAULT_OPACITY })
	}
	);

	activityLineLayer.on("mouseover", (ev) => { if (!isPopupOpen) (ev.target as L.Polyline).setStyle({ weight: 6, opacity: 1 }) });
	activityLineLayer.on("mouseout", (ev) => { if (!isPopupOpen) (ev.target as L.Polyline).setStyle({ weight: 3, opacity: DEFAULT_OPACITY }) });
}
