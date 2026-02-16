import { useEffect, useState } from "react";
import MenuBar from "@/components/MenuBar";
import { Box, Text, Table, Button } from "@chakra-ui/react";
import { StravaActivity } from "@/types";
import { fetchStravaActivities } from "@/modules/api/strava";

export function DashboardPage() {
	const [activities, setActivities] = useState<StravaActivity[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		fetchActivities();
	}, []);

	/**
	 * Fetches activities from Strava
	 */
	const fetchActivities = async () => {
		try {
			setLoading(true);
			const response = await fetchStravaActivities();
			if (response) {
				setActivities(response);
			} else {
				setError(
					"Failed to load activities. Please try connecting Strava again.",
				);
			}
		} catch (err) {
			console.error("Error syncing activities:", err);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Box className="layout dashboard-page">
			<MenuBar />
			<Text textStyle="2xl">Dashboard</Text>
			<Button onClick={fetchActivities}>Sync activities</Button>
			<Box id="dashboard-content">
				{loading && <p>Loading activities...</p>}
				{error && <p>{error}</p>}
				{!loading && !error && (
					<>
						<Text textStyle="xl">Your Activities</Text>
						<Text>Found {activities.length} activities</Text>
						<Table.Root>
							<Table.Header>
								<Table.Row>
									<Table.ColumnHeader>
										Sport
									</Table.ColumnHeader>
									<Table.ColumnHeader>
										Name
									</Table.ColumnHeader>
									<Table.ColumnHeader>
										Distance
									</Table.ColumnHeader>
									<Table.ColumnHeader>
										Date
									</Table.ColumnHeader>
								</Table.Row>
							</Table.Header>
							<Table.Body>
								{activities.map((activity) => (
									<Table.Row key={activity.id}>
										<Table.Cell>
											{activity.sportType}
										</Table.Cell>
										<Table.Cell>{activity.name}</Table.Cell>
										<Table.Cell>
											{activity.distance}
										</Table.Cell>
										<Table.Cell>
											{activity.startDate.toString()}
										</Table.Cell>
									</Table.Row>
								))}
							</Table.Body>
						</Table.Root>
					</>
				)}
			</Box>
		</Box>
	);
}
