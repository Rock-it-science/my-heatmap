import { StravaActivity } from "shared/index";
import L from "../leaflet-setup";
import { createActivityPopup } from "./activity-popup";

const DEFAULT_OPACITY = 0.2;

interface ActivityLayer extends L.Polyline {
	activityId: string;
	sportType: string;
	startDate: string;
}

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
	activityLineOpacity: number,
): L.LayerGroup<ActivityLayer> {
	const activityLineLayers = activityPolyLines.map((activityPolyline) => {
		const activityLineLayer: any = L.polyline(
			activityPolyline.polylinePoints,
			{
				color: activityPolyline.sportTypeColour,
				opacity: activityLineOpacity,
			},
		);
		activityLineLayer.sportType = activityPolyline.sportType;
		activityLineLayer.startDate = activityPolyline.startDate;
		activityLineLayer.activityId = activityPolyline.id;
		activityLineLayer.bindPopup(
			() => createActivityPopup(activityPolyline.id),
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
function setActivityLineEvents(
	activityLineLayer: ActivityLayer,
	activityLineOpacity: number = DEFAULT_OPACITY,
): void {
	let isPopupOpen = false;
	activityLineLayer.on("popupopen", (ev) => {
		isPopupOpen = true;
		(ev.target as L.Polyline).setStyle({ weight: 6, opacity: 1 });
	});
	activityLineLayer.on("popupclose", (ev) => {
		isPopupOpen = false;
		(ev.target as L.Polyline).setStyle({
			weight: 3,
			opacity: activityLineOpacity,
		});
	});

	activityLineLayer.on("mouseover", (ev) => {
		if (!isPopupOpen)
			(ev.target as L.Polyline).setStyle({ weight: 6, opacity: 1 });
	});
	activityLineLayer.on("mouseout", (ev) => {
		if (!isPopupOpen)
			(ev.target as L.Polyline).setStyle({
				weight: 3,
				opacity: activityLineOpacity,
			});
	});
	return;
}

/**
 * Functionally disable a layer without removing it from its parent
 */
export function disableActivityLineLayer(
	activityLineLayer: ActivityLayer,
): void {
	activityLineLayer.setStyle({
		opacity: 0,
		interactive: false,
	});

	activityLineLayer.unbindPopup();

	activityLineLayer.off("popupopen");
	activityLineLayer.off("popupclose");
	activityLineLayer.off("mouseover");
	activityLineLayer.off("mouseout");

	return;
}

/**
 Enables layer functionality - resets everything that may have been disabled by disableActivityLineLayer
 */
export function enableActivityLineLayer(
	activityLineLayer: ActivityLayer,
	activityLineOpacity: number = DEFAULT_OPACITY,
): void {
	activityLineLayer.setStyle({
		opacity: activityLineOpacity,
		interactive: true,
	});

	activityLineLayer.bindPopup(
		() => createActivityPopup(activityLineLayer.activityId),
		{
			minWidth: 200,
		},
	);
	setActivityLineEvents(activityLineLayer);

	return;
}
