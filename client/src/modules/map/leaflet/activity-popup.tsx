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
import { StravaActivity } from "@/types";
import { fetchStravaActivities } from "@/modules/api/strava";

/** Popup component that gets asynchronously populated with activity details */
function ActivityPopup({ activityId }: { activityId: string }): JSX.Element {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | undefined>(undefined);
	const [activityDetails, setActivityDetails] = useState<StravaActivity>();
	useEffect(() => {
		(async () => {
			try {
				const activities = await fetchStravaActivities();
				if (activities) {
					const activity = activities.find(
						(activity) => activity.id.toString() === activityId,
					);
					setActivityDetails(activity);
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

	return (
		<ChakraProvider value={defaultSystem}>
			{loading && <Spinner />}
			{activityDetails && (
				<VStack width="200px">
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
								<Table.Cell>Total Elevation Gain</Table.Cell>
								<Table.Cell>
									{activityDetails.totalElevationGain}m
								</Table.Cell>
							</Table.Row>
						</Table.Body>
					</Table.Root>
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
export function createActivityPopup(activity: StravaActivity): HTMLElement {
	const popupContainer = document.createElement("div");
	const root = createRoot(popupContainer);
	root.render(<ActivityPopup activityId={activity.id.toString()} />);
	return popupContainer;
}
