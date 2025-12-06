import { useEffect, useRef, useState } from "react";
import {
	Box,
	Text,
	Checkbox,
	CheckboxGroup,
	Fieldset,
	HStack,
} from "@chakra-ui/react";
import * as L from "leaflet";
import MenuBar from "@/components/menu-bar";
import "leaflet.heat";
import { ActivityPolyline } from "@/types";
import { FaCircle } from "react-icons/fa";

function Heatmap() {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	/** The DOM Element that contains the map */
	const mapContainerRef = useRef<HTMLDivElement>(null);

	/** The map DOM element */
	const mapRef = useRef<L.Map | null>(null);

	// Layer controls
	// TODO - if adding more layers, consider using a data structure to manage these variables
	const heatmapLayerRef = useRef<L.HeatLayer | null>(null);
	const [heatmapLayerEnabled, setHeatmapLayerEnabled] = useState(true);
	const activityLinesLayerRef = useRef<L.LayerGroup | null>(null);
	const [activityLinesLayerEnabled, setActivityLinesLayerEnabled] =
		useState(false);

	/** Activity geo data */
	const [activityPolyLines, setActivityPolyLines] = useState<
		ActivityPolyline[] | undefined
	>();
	const [activityColorMap, setActivityColorMap] = useState<
		{ activityType: string; color: string }[]
	>([]);

	// Fetch activity data
	useEffect(() => {
		const fetchActivities = async () => {
			try {
				setLoading(true);
				const response = await fetch("/api/activities/polylines");
				if (response.ok) {
					const data = await response.json();
					setActivityPolyLines(data);
				} else {
					throw Error();
				}
			} catch (err) {
				console.error("Error fetching activities:", err);
				setError("Error loading activities. Please try again.");
			} finally {
				setLoading(false);
			}
		};

		fetchActivities();
	}, []);

	// Get color mapping from current activity list
	useEffect(() => {
		if (activityPolyLines) {
			const tempActivityColorMap: {
				activityType: string;
				color: string;
			}[] = [];
			for (const activity of activityPolyLines) {
				if (
					activityColorMap &&
					!tempActivityColorMap.some(
						(mapping) =>
							mapping.activityType === activity.sportType,
					)
				) {
					tempActivityColorMap.push({
						activityType: activity.sportType,
						color: activity.color,
					});
				}
			}
			setActivityColorMap(tempActivityColorMap);
		}
	}, [activityPolyLines]);

	// TODO Show a loading symbol while loading is true

	// Initialize the map - should only happen once, and should wait for mapref to be defined
	useEffect(() => {
		if (!mapContainerRef.current || mapRef.current) return;

		const osm = L.tileLayer(
			"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
			{
				attribution: "© OpenStreetMap contributors",
			},
		);

		// Initialize Leaflet map
		const mapInstance = new L.Map("map", {
			center: [50.875, -114.045], // TODO Make this dynamic based on min/max values of user's activities
			zoom: 13,
			layers: [osm],
		});

		mapRef.current = mapInstance;

		// Cleanup function
		// TODO When should this run?
		// return () => {
		// 	if (mapRef.current) {
		// 		mapRef.current.remove();
		// 		mapRef.current = null;
		// 	}
		// };
	}, [mapContainerRef, mapRef]);

	// Update layers when activityPolyLines changes
	useEffect(() => {
		if (
			!mapRef.current ||
			!activityPolyLines ||
			activityPolyLines?.length === 0
		)
			return;

		// Set up data
		let allCoords: [number, number, number][] = [];
		for (const activity of activityPolyLines) {
			for (const activityPoints of activity.polylinePoints) {
				allCoords.push([activityPoints[0], activityPoints[1], 0.35]); // Third value here is intensity
			}
		}

		// Create new layers
		const newHeatmapLayer = L.heatLayer(allCoords, { radius: 10 });
		const newActivityLinesLayer = L.layerGroup(
			activityPolyLines.map((activityPolyline) =>
				L.polyline(activityPolyline.polylinePoints, {
					color: activityPolyline.color,
				}),
			),
		);

		// Update refs and state with new layers
		heatmapLayerRef.current = newHeatmapLayer;
		activityLinesLayerRef.current = newActivityLinesLayer;

		// Add heatmap layer by default
		newHeatmapLayer.addTo(mapRef.current);
		setHeatmapLayerEnabled(true);
		setActivityLinesLayerEnabled(false);
	}, [activityPolyLines]);

	/**
	 * Mapping of callback functions to toggle layer visibility from the map
	 */
	const toggleLayer = {
		heatmap: () => {
			if (mapRef.current && heatmapLayerRef.current) {
				if (heatmapLayerEnabled) {
					heatmapLayerRef.current.removeFrom(mapRef.current);
					setHeatmapLayerEnabled(false);
				} else {
					heatmapLayerRef.current.addTo(mapRef.current);
					setHeatmapLayerEnabled(true);
				}
			}
		},
		activityLines: () => {
			if (mapRef.current && activityLinesLayerRef.current) {
				if (activityLinesLayerEnabled) {
					activityLinesLayerRef.current.removeFrom(mapRef.current);
					setActivityLinesLayerEnabled(false);
				} else {
					activityLinesLayerRef.current.addTo(mapRef.current);
					setActivityLinesLayerEnabled(true);
				}
			}
		},
	};

	return (
		<Box className="layout heatmap-page">
			<MenuBar />
			<Text
				id="error-text"
				hidden={!error}
				padding="8px"
				color="red"
				background="white"
			>
				{error}
			</Text>
			<Box
				ref={mapContainerRef}
				id="map"
				style={{ height: "calc(100vh - 60px)", width: "100%" }}
			>
				<Box
					id="map-controls"
					zIndex="max"
					position="absolute"
					right="0"
					top="0"
					padding="8px"
					width="192px"
					marginRight="0"
					marginLeft="auto"
					background="var(--dark-gray)"
				>
					<Fieldset.Root>
						<Fieldset.Legend>Layers</Fieldset.Legend>
						<CheckboxGroup>
							<Checkbox.Root
								key="heatmap-layer"
								onCheckedChange={toggleLayer.heatmap}
								checked={heatmapLayerEnabled}
							>
								<Checkbox.HiddenInput />
								<Checkbox.Control />
								<Checkbox.Label>Heatmap</Checkbox.Label>
							</Checkbox.Root>
							<Checkbox.Root
								key="activity-lines-layer"
								onCheckedChange={toggleLayer.activityLines}
								checked={activityLinesLayerEnabled}
							>
								<Checkbox.HiddenInput />
								<Checkbox.Control />
								<Checkbox.Label>Activity Lines</Checkbox.Label>
							</Checkbox.Root>
						</CheckboxGroup>
					</Fieldset.Root>
				</Box>
				<Box
					id="map-legend"
					zIndex="max"
					position="absolute"
					right="0"
					bottom="0"
					padding="8px"
					width="192px"
					marginRight="0"
					marginLeft="auto"
					background="var(--dark-gray)"
				>
					<Text>Legend</Text>
					{activityColorMap.map((mapping) => (
						<HStack>
							<FaCircle color={mapping.color} />
							<Text>{mapping.activityType}</Text>
						</HStack>
					))}
				</Box>
			</Box>
		</Box>
	);
}

export default Heatmap;
