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
import L from "./leaflet-setup";
import { FaCircle } from "react-icons/fa";
import {
	createActivityLinesLayerGroup,
	createHeatLayer,
	disableActivityLineLayer,
	enableActivityLineLayer,
} from "./activities/layers";
import { fetchStravaActivities } from "../api/strava-api";
import { StravaActivity } from "shared/index";
import { SpinnerDialog } from "@/components/SpinnerDialog";
import { ChartData, ChartOptions } from "chart.js";
import { MapContainer, TileLayer } from "react-leaflet";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
);

/** Activity Chart config */
const chartOptions: ChartOptions<"bar"> = {
	responsive: true,
	maintainAspectRatio: false,
	scales: {
		x: {
			grid: {
				display: false,
			},
			ticks: {
				display: false,
			},
		},
		y: {
			grid: {
				display: false,
			},
			ticks: {
				display: false,
			},
		},
	},
	plugins: {
		// tooltip: {
		// 	enabled: false,
		// },
		legend: {
			display: false,
		},
	},
};
const chartDataEmptyState: ChartData<"bar"> = {
	labels: undefined,
	datasets: [
		{
			label: undefined,
			data: [],
		},
	],
};

const zIndexMap = {
	map: 100,
	overlay: 200,
};

export function MapApp() {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	/** The DOM Element that contains the map */
	const mapContainerRef = useRef<HTMLDivElement>(null);

	/** The map DOM element */
	const [map, setMap] = useState<L.Map | null>(null);

	/** Refs for control overlays to prevent map interactions */
	const mapControlsRef = useRef<HTMLDivElement>(null);
	const mapLegendRef = useRef<HTMLDivElement>(null);

	/** Activity Histogram Chart Data */
	const [chartData, setChartData] =
		useState<ChartData<"bar">>(chartDataEmptyState);

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
	const [activityDateRange, setActivityDateRange] = useState<
		[Date, Date] | null
	>(null);

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

			// Initialize chart data from activity data
			//		Create count of data that occured in each month
			const sortedActivityDates = activityPolyLines
				.map((activity) => new Date(activity.startDate))
				.sort((a, b) => a.getTime() - b.getTime());
			setActivityDateRange([
				sortedActivityDates[0],
				sortedActivityDates[sortedActivityDates.length - 1],
			]);
			let activityMonths: string[] = [];
			sortedActivityDates.map((activityDate) => {
				const activityMonthString = activityDate.toLocaleDateString(
					undefined,
					{ year: "numeric", month: "long" },
				);
				activityMonths.push(activityMonthString);
			});
			const monthCounts = activityMonths.reduce(
				(acc: { [key: string]: number }, item: string) => {
					acc[item] = (acc[item] || 0) + 1;
					return acc;
				},
				{},
			);
			setChartData({
				labels: Object.keys(monthCounts),
				datasets: [
					{
						label: "Activity Month",
						data: Object.values(monthCounts),
						backgroundColor: "rgba(77, 166, 255, 0.7)",
					},
				],
			});
		}
	}, [activityPolyLines]);

	// Create layers
	useEffect(() => {
		if (!map || !activityPolyLines || activityPolyLines?.length === 0)
			return;

		const heatLayer = createHeatLayer(activityPolyLines);

		const activityLinesLayer =
			createActivityLinesLayerGroup(activityPolyLines);

		// Update refs and state with new layers
		heatmapLayerRef.current = heatLayer;
		activityLinesLayerRef.current = activityLinesLayer;

		// Add activity lines layer by default
		activityLinesLayer.addTo(map);
		setHeatmapLayerEnabled(false);
		setActivityLinesLayerEnabled(true);

		return () => {
			heatLayer.remove();
			activityLinesLayer.remove();
		};
	}, [activityPolyLines]);

	function updateHeatmapPointRadius(value: number) {
		heatmapLayerRef.current?.setOptions({
			...heatmapLayerRef.current.options,
			radius: value,
		});
	}

	function updateActivityLinesOpacity(value: number) {
		activityLinesLayerRef.current?.eachLayer(
			(layer: L.Layer) =>
				((layer.options as L.PolylineOptions).opacity = value),
		);
	}

	function updateActivityLinesDateRange(
		filterStartPercent: number,
		filterEndPercent: number,
	) {
		console.log(
			`Updating activity lines date range to values: ${filterStartPercent}, ${filterEndPercent}`,
		);
		if (
			!activityDateRange ||
			!map ||
			!activityLinesLayerRef ||
			!activityLinesLayerRef.current
		) {
			return;
		}

		const activityDateRangeStartMS = activityDateRange[0].valueOf();
		const activityDateRangeDiffMS =
			activityDateRange[1].valueOf() - activityDateRangeStartMS;

		// given start and end percentage in range, need to find start and end date to use for filter
		// have date range of activities, calculate what date would be at X% between those numbers

		const filterStartRatioMS =
			activityDateRangeDiffMS * (filterStartPercent / 100);
		const filterEndRatioMS =
			activityDateRangeDiffMS * (filterEndPercent / 100);

		// Calculate actual filter thresholds in MS by adding start date
		const filterStartMS = activityDateRangeStartMS + filterStartRatioMS;
		const filterEndMS = activityDateRangeStartMS + filterEndRatioMS;

		// For each layer, enable if in range, and disable if not in range
		activityLinesLayerRef.current?.eachLayer((layer: L.Layer) => {
			const activityDateMS = new Date((layer as any).startDate).valueOf();
			if (
				activityDateMS >= filterStartMS &&
				activityDateMS <= filterEndMS
			) {
				// Activity in filter range
				enableActivityLineLayer(layer as any);
			} else {
				// Activity out of filter range
				disableActivityLineLayer(layer as any);
			}
		});
	}

	/**
	 * Mapping of callback functions to toggle layer visibility from the map
	 */
	const toggleLayer = {
		heatmap: () => {
			if (map && heatmapLayerRef.current) {
				if (heatmapLayerEnabled) {
					heatmapLayerRef.current.removeFrom(map);
					setHeatmapLayerEnabled(false);
				} else {
					heatmapLayerRef.current.addTo(map);
					setHeatmapLayerEnabled(true);
				}
			}
		},
		activityLines: () => {
			if (map && activityLinesLayerRef.current) {
				if (activityLinesLayerEnabled) {
					activityLinesLayerRef.current.removeFrom(map);
					setActivityLinesLayerEnabled(false);
				} else {
					activityLinesLayerRef.current.addTo(map);
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
		<Box id="map-page-root">
			<Text
				id="error-text"
				hidden={!error}
				padding="8px"
				color="red"
				background="white"
				zIndex={zIndexMap.overlay}
				position="absolute"
				left={0}
				bottom={0}
				fontSize="xl"
			>
				{error}
			</Text>
			<SpinnerDialog loading={loading} />
			<Box ref={mapContainerRef} id="map-container">
				<MapContainer
					ref={setMap}
					center={[50.875, -114.045]} // TODO Make this dynamic based on min/max values of user's activities
					zoom={13}
					style={{
						height: "calc(100vh - 60px)",
						width: "100%",
						zIndex: zIndexMap.map,
					}}
				>
					<TileLayer
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					/>
				</MapContainer>
				<Box
					ref={mapControlsRef}
					id="map-controls"
					zIndex={zIndexMap.overlay}
					position="absolute"
					right="0"
					top="60px"
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
					zIndex={zIndexMap.overlay}
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
			<Box
				position="absolute"
				bottom="0"
				paddingLeft="20px"
				height="100px"
				width="calc(100vh - 176px)"
			>
				<Bar
					options={chartOptions}
					data={chartData}
					style={{
						zIndex: zIndexMap.overlay,
						position: "absolute",
					}}
				/>
				<Slider.Root
					defaultValue={[0, 100]}
					zIndex={zIndexMap.overlay}
					onValueChange={(d) =>
						updateActivityLinesDateRange(d.value[0], d.value[1])
					}
				>
					<Slider.Control>
						<Slider.Track>
							<Slider.Range />
						</Slider.Track>
						<Slider.Thumbs />
					</Slider.Control>
				</Slider.Root>
			</Box>
		</Box>
	);
}
