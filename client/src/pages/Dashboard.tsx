import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Activity } from "../types";

// Helper function to get cookie value by name
function getCookie(name: string): string | null {
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
	return null;
}

function Dashboard() {
	const [athleteId, setAthleteId] = useState<string | null>(null);
	const [activities, setActivities] = useState<Activity[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		// Read athlete_id from cookie
		const id = getCookie("athlete_id");
		setAthleteId(id);
		if (id) {
			fetchActivities(id);
		} else {
			setLoading(false);
		}
	}, []);

	async function fetchActivities(athleteId: string) {
		try {
			setLoading(true);
			const response = await fetch(
				`/api/list_activities?athlete_id=${athleteId}`,
			);
			if (response.ok) {
				const data = await response.json();
				setActivities(data);
			} else {
				setError(
					"Failed to load activities. Please try connecting Strava again.",
				);
			}
		} catch (err) {
			console.error("Error fetching activities:", err);
			setError("Error loading activities. Please try again.");
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="dashboard-page">
			<h1>Dashboard</h1>
			<div id="dashboard-content">
				{loading && <p>Loading activities...</p>}
				{error && <p>{error}</p>}
				{!loading && !error && athleteId && (
					<>
						<h2>Your Activities</h2>
						<p>Found {activities.length} activities</p>
						<ul>
							{activities.slice(0, 10).map((activity) => (
								<li key={activity.id}>
									{activity.name || "Untitled"} -{" "}
									{activity.type || "Activity"}
								</li>
							))}
						</ul>
					</>
				)}
				{!loading && !error && !athleteId && (
					<p>
						No athlete ID found. Please{" "}
						<a href="/strava/auth">connect your Strava account</a>{" "}
						first.
					</p>
				)}
			</div>
			<nav>
				<Link to="/heatmap">View Heatmap</Link>
				<Link to="/">Home</Link>
			</nav>
		</div>
	);
}

export default Dashboard;
