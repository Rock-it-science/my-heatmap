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
import { ActivityPolyline, DetailedActivityResponse } from "@/types";
import { JSX, useEffect, useState } from "react";

/** Popup component that gets asynchronously populated with activity details */
function ActivityPopup({ activityId }: { activityId: string }): JSX.Element {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | undefined>(undefined);
	const [activityDetails, setActivityDetails] =
		useState<DetailedActivityResponse>();
	useEffect(() => {
		(async () => {
			try {
				const response = await fetch(
					`/api/activity?activityId=${activityId}`,
				);
				if (response.ok) {
					const data = await response.json();
					setActivityDetails(data);
				} else {
					throw Error();
				}
			} catch (err) {
				console.error("Error fetching activities:", err);
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
				<VStack>
					<Text textStyle="lg">{activityDetails.name}</Text>
					<Table.Root>
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
export function createActivityPopup(activity: ActivityPolyline): HTMLElement {
	const popupContainer = document.createElement("div");
	const root = createRoot(popupContainer);
	root.render(<ActivityPopup activityId={activity.activityId.toString()} />);
	return popupContainer;
}
