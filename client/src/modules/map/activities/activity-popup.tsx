import {
	Text,
	VStack,
	Table,
	defaultSystem,
	ChakraProvider,
	Box,
	Spinner,
} from "@chakra-ui/react";
import { createRoot } from "react-dom/client";
import { JSX, useEffect, useState } from "react";
import { Activity3dPositions, StravaActivity } from "shared/index";
import {
	fetchActivity3dPositions,
	getLocalActivitiesIfAvailable,
} from "@/modules/api/strava-api";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	Title,
	Tooltip,
	Legend,
	LineElement,
	PointElement,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import { ChartData, ChartOptions } from "chart.js";

ChartJS.register(
	CategoryScale,
	LinearScale,
	LineElement,
	PointElement,
	Title,
	Tooltip,
	Legend,
);

/** Activity Chart config */
const activity3dChartOptions: ChartOptions<"line"> = {
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
			beginAtZero: true,
			grid: {
				display: false,
			},
			ticks: {
				display: true,
			},
		},
	},
	plugins: {
		// tooltip: {
		// 	enabled: false,
		// },
		legend: {
			display: true,
		},
	},
};
const chartDataEmptyState: ChartData<"line"> = {
	labels: undefined,
	datasets: [
		{
			label: undefined,
			data: [],
		},
	],
};

/** Popup component that gets asynchronously populated with activity details */
function ActivityPopup({ activityId }: { activityId: string }): JSX.Element {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | undefined>(undefined);
	const [activityDetails, setActivityDetails] = useState<StravaActivity>();
	const [activity3dPositions, setActivity3dPosition] =
		useState<Activity3dPositions>();
	const [activity3dChartData, setActivity3dChartData] =
		useState<ChartData<"line">>(chartDataEmptyState);
	useEffect(() => {
		(async () => {
			try {
				const activities = getLocalActivitiesIfAvailable();
				if (activities) {
					const activity = activities.find(
						(activity) => activity.id.toString() === activityId,
					);
					setActivityDetails(activity);
					setActivity3dPosition(
						await fetchActivity3dPositions(activityId),
					);
				} else {
					throw Error();
				}
			} catch (err) {
				console.error("Error fetching activity:", err);
				setError("Error loading activity");
			} finally {
				setLoading(false);
			}
		})();
	}, [activityId]);

	// Set chart data
	useEffect(() => {
		if (!activity3dPositions) {
			return;
		}
		const activity3dPositionsAltitudes = activity3dPositions?.map(
			(position) => position.altitude,
		);
		const activity3dPositionDistances = activity3dPositions?.map(
			(position) => position.distance,
		);
		setActivity3dChartData({
			labels: activity3dPositionDistances,
			datasets: [
				{
					label: "Elevation",
					data: activity3dPositionsAltitudes,
					backgroundColor: "rgba(77, 166, 255, 0.7)",
				},
			],
		});
	}, [activity3dPositions]);

	return (
		<ChakraProvider value={defaultSystem}>
			{loading && <Spinner />}
			{activityDetails && (
				<VStack width="300px" height="600px">
					<Text textStyle="lg">{activityDetails.name}</Text>
					<Table.Root showColumnBorder={false} variant="outline">
						<Table.Body>
							<Table.Row>
								<Table.Cell>Sport Type</Table.Cell>
								<Table.Cell>
									{activityDetails.sportType}
								</Table.Cell>
							</Table.Row>
							<Table.Row>
								<Table.Cell>Distance</Table.Cell>
								<Table.Cell>
									{activityDetails.distance
										? (
												activityDetails.distance / 1000
											).toFixed(2)
										: ""}
									km
								</Table.Cell>
							</Table.Row>
							<Table.Row>
								<Table.Cell>Total Elevation Gain</Table.Cell>
								<Table.Cell>
									{activityDetails.totalElevationGain?.toLocaleString()}
									m
								</Table.Cell>
							</Table.Row>
							<Table.Row>
								<Table.Cell>Activity Date</Table.Cell>
								<Table.Cell>
									{new Date(
										activityDetails.startDate,
									).toLocaleDateString(undefined, {
										year: "numeric",
										month: "long",
										day: "2-digit",
									})}
								</Table.Cell>
							</Table.Row>
						</Table.Body>
					</Table.Root>
					<Box height="250px" marginTop="50px">
						<Line
							options={activity3dChartOptions}
							data={activity3dChartData}
						/>
					</Box>
				</VStack>
			)}
			{error && (
				<Box color="red">
					<Text>{error}</Text>
				</Box>
			)}
		</ChakraProvider>
	);
}

/** Returns the popup component as an HTML Element */
export function createActivityPopup(activityId: string): HTMLElement {
	const popupContainer = document.createElement("div");
	const root = createRoot(popupContainer);
	root.render(<ActivityPopup activityId={activityId} />);
	return popupContainer;
}
