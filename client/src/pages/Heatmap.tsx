import { useEffect, useRef, useState } from "react";
import {
	Box,
	Text,
	Checkbox,
	CheckboxGroup,
	Fieldset,
	HStack,
	Slider,
} from "@chakra-ui/react";
import * as L from "leaflet";
import MenuBar from "@/components/MenuBar";
import "leaflet.heat";
import { ActivityPolyline } from "@/types";
import { FaCircle } from "react-icons/fa";
import { popupElement } from "@/components/map/popup-element";

function Heatmap() {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	/** The DOM Element that contains the map */
	const mapContainerRef = useRef<HTMLDivElement>(null);

	/** The map DOM element */
	const mapRef = useRef<L.Map | null>(null);

	/** Refs for control overlays to prevent map interactions */
	const mapControlsRef = useRef<HTMLDivElement>(null);
	const mapLegendRef = useRef<HTMLDivElement>(null);

	// Layer controls
	// TODO - if adding more layers, consider using a data structure to manage these variables
	const heatmapLayerRef = useRef<L.HeatLayer | null>(null);
	const [heatmapLayerEnabled, setHeatmapLayerEnabled] = useState(true);
	const activityLinesLayerRef = useRef<L.LayerGroup | null>(null);
	const [activityLinesLayerEnabled, setActivityLinesLayerEnabled] =
		useState(false);
	const [sportTypeEnabled, setSportTypeEnabled] = useState<
		Record<string, boolean>
	>({});

	/** Activity geo data */
	const [activityPolyLines, setActivityPolyLines] = useState<
		ActivityPolyline[] | undefined
	>();
	const [activityColorMap, setActivityColorMap] = useState<
		{ sportType: string; sportTypeFormatted: string; color: string }[]
	>([]);

	// Fetch activity data
	useEffect(() => {
		(async () => {
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
		})();
	}, []);

	// Get color mapping from current activity list
	useEffect(() => {
		if (activityPolyLines) {
			const tempActivityColorMap: {
				sportType: string;
				sportTypeFormatted: string;
				color: string;
			}[] = [];
			for (const activity of activityPolyLines) {
				if (
					activityColorMap &&
					!tempActivityColorMap.some(
						(mapping) => mapping.sportType === activity.sportType,
					)
				) {
					tempActivityColorMap.push({
						sportType: activity.sportType,
						sportTypeFormatted: activity.sportType.replace(
							/(?!^)(?=[A-Z])/g,
							" ",
						),
						color: activity.color,
					});
				}
			}
			setActivityColorMap(tempActivityColorMap);
			const sportTypeRecord: Record<string, boolean> = Object.fromEntries(
				tempActivityColorMap.map((map) => [map.sportType, true]),
			);
			setSportTypeEnabled(sportTypeRecord);
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

		// Prevent map interactions on control overlays
		// Use requestAnimationFrame to ensure DOM elements are available
		requestAnimationFrame(() => {
			const controlsEl = document.getElementById("map-controls");
			const legendEl = document.getElementById("map-legend");

			if (controlsEl) {
				L.DomEvent.disableClickPropagation(controlsEl);
				L.DomEvent.disableScrollPropagation(controlsEl);
			}
			if (legendEl) {
				L.DomEvent.disableClickPropagation(legendEl);
				L.DomEvent.disableScrollPropagation(legendEl);
			}
		});

		// Cleanup function
		return () => {
			if (mapRef.current) {
				mapRef.current.remove();
				mapRef.current = null;
			}
		};
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
		const heatmapLayer = L.heatLayer(allCoords, {
			radius: 12,
		});
		const activityLinesLayer = L.layerGroup(
			activityPolyLines.map((activityPolyline) => {
				const activityLineLayer = L.polyline(
					activityPolyline.polylinePoints,
					{
						color: activityPolyline.color,
					},
				);
				(activityLineLayer as any).sportType =
					activityPolyline.sportType;
				activityLineLayer.bindPopup(popupElement(activityPolyline));
				return activityLineLayer;
			}),
		);

		// Update refs and state with new layers
		heatmapLayerRef.current = heatmapLayer;
		activityLinesLayerRef.current = activityLinesLayer;

		// Add heatmap layer by default
		heatmapLayer.addTo(mapRef.current);
		setHeatmapLayerEnabled(true);
		setActivityLinesLayerEnabled(false);

		return () => {
			heatmapLayer.remove();
			activityLinesLayer.remove();
		};
	}, [activityPolyLines]);

	const updateHeatmapPointRadius = (value: number) => {
		heatmapLayerRef.current?.setOptions({
			...heatmapLayerRef.current.options,
			radius: value,
		});
	};

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
		/**
		 * Toggle all activity lines for a sport type and the legend icon
		 */
		activityLineSport: (sportType: string) => {
			activityLinesLayerRef.current?.eachLayer((layer) => {
				const polylineLayer = layer as L.Polyline & {
					sportType?: string;
				};
				if (polylineLayer.sportType === sportType) {
					polylineLayer.setStyle({
						opacity: sportTypeEnabled[sportType] ? 0 : 1,
					});
				}
			});
			setSportTypeEnabled({
				...sportTypeEnabled,
				[sportType]: !sportTypeEnabled[sportType],
			});
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
					ref={mapControlsRef}
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
							<Slider.Root
								defaultValue={[12]}
								min={1}
								max={25}
								size="sm"
								onValueChange={(d) =>
									updateHeatmapPointRadius(d.value[0])
								}
							>
								<Slider.Label>Point intensity</Slider.Label>
								<Slider.ValueText />
								<Slider.Control>
									<Slider.Track>
										<Slider.Range />
									</Slider.Track>
									<Slider.Thumbs />
								</Slider.Control>
							</Slider.Root>
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
					ref={mapLegendRef}
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
					<Text textStyle="lg" width="100%" textAlign="center">
						Legend
					</Text>
					{activityColorMap.map((mapping) => (
						<HStack
							key={mapping.sportType}
							onClick={() =>
								toggleLayer.activityLineSport(mapping.sportType)
							}
						>
							<FaCircle
								color={
									sportTypeEnabled[mapping.sportType]
										? mapping.color
										: "var(--dark-gray)"
								}
							/>
							<Text textStyle="sm">
								{mapping.sportTypeFormatted}
							</Text>
						</HStack>
					))}
				</Box>
			</Box>
		</Box>
	);
}

export default Heatmap;
