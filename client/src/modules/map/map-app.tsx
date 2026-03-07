import { useEffect, useRef, useState } from "react";
import {
	Box,
	Text,
	Checkbox,
	CheckboxGroup,
	Fieldset,
	HStack,
	Slider,
	Loader,
} from "@chakra-ui/react";
import L from "./leaflet-setup";
import { FaCircle } from "react-icons/fa";
import { initMap } from "./map";
import {
	createActivityLinesLayerGroup,
	createHeatLayer,
} from "./activities/layers";
import { fetchStravaActivities } from "../api/strava-api";
import { StravaActivity } from "shared/index";

export function MapApp() {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	/** The DOM Element that contains the map */
	const mapContainerRef = useRef<HTMLDivElement>(null);

	/** The map DOM element */
	const mapRef = useRef<L.Map>(undefined);

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
		StravaActivity[] | undefined
	>();
	const [activityColorMap, setActivityColorMap] = useState<
		{ sportType: string; sportTypeFormatted: string; color: string }[]
	>([]);

	// Fetch activity data
	useEffect(() => {
		(async () => {
			try {
				setLoading(true);
				const activities = await fetchStravaActivities();
				setActivityPolyLines(activities);
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
						color: activity.sportTypeColour,
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

	// Initialize the map - should only happen once, and should wait for mapref to be defined
	useEffect(() => {
		if (!mapContainerRef.current || mapRef.current) return;

		initMap(mapRef);

		// Cleanup function
		return () => {
			if (mapRef.current) {
				mapRef.current.remove();
				mapRef.current = undefined;
			}
		};
	}, [mapContainerRef, mapRef]);

	// Create layers
	useEffect(() => {
		if (
			!mapRef.current ||
			!activityPolyLines ||
			activityPolyLines?.length === 0
		)
			return;

		const heatLayer = createHeatLayer(activityPolyLines);

		const activityLinesLayer =
			createActivityLinesLayerGroup(activityPolyLines);

		// Update refs and state with new layers
		heatmapLayerRef.current = heatLayer;
		activityLinesLayerRef.current = activityLinesLayer;

		// Add activity lines layer by default
		activityLinesLayer.addTo(mapRef.current);
		setHeatmapLayerEnabled(false);
		setActivityLinesLayerEnabled(true);

		return () => {
			heatLayer.remove();
			activityLinesLayer.remove();
		};
	}, [activityPolyLines]);

	const updateHeatmapPointRadius = (value: number) => {
		heatmapLayerRef.current?.setOptions({
			...heatmapLayerRef.current.options,
			radius: value,
		});
	};

	const updateActivityLinesOpacity = (value: number) => {
		activityLinesLayerRef.current?.eachLayer(
			(layer: L.Layer) =>
				((layer.options as L.PolylineOptions).opacity = value),
		);
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
		<Box id="map">
			<Loader />
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
							<Slider.Root
								defaultValue={[12]}
								min={1}
								max={25}
								size="sm"
								onValueChange={(d) =>
									updateActivityLinesOpacity(d.value[0])
								}
							>
								<Slider.Label>
									Activity Line Opacity
								</Slider.Label>
								<Slider.ValueText />
								<Slider.Control>
									<Slider.Track>
										<Slider.Range />
									</Slider.Track>
									<Slider.Thumbs />
								</Slider.Control>
							</Slider.Root>
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
