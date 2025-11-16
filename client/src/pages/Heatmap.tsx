import { useEffect, useRef, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import * as L from "leaflet";
// import "leaflet.heat";

function Heatmap() {
	const [searchParams] = useSearchParams();
	const athleteId = searchParams.get("athlete_id");
	const [activityPolyLines, setActivityPolyLines] = useState<
		[number, number][][]
	>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const mapRef = useRef<L.Map | null>(null);
	const mapContainerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (athleteId) {
			fetchActivities(athleteId);
		} else {
			setLoading(false);
		}
	}, [athleteId]);

	async function fetchActivities(athleteId: string) {
		try {
			setLoading(true);
			const response = await fetch(
				`/api/activities/polylines?athlete_id=${athleteId}`,
			);
			if (response.ok) {
				const data = await response.json();
				setActivityPolyLines(data);
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

	useEffect(() => {
		if (!mapContainerRef.current || mapRef.current) return;

		// Initialize Leaflet map
		const map = L.map(mapContainerRef.current).setView(
			[50.875, -114.045],
			13,
		);

		// Add OpenStreetMap tiles
		L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
			attribution: "© OpenStreetMap contributors",
		}).addTo(map);

		L.polyline(activityPolyLines).addTo(map);

		mapRef.current = map;
		console.log("Map initialized successfully");

		// Cleanup function
		return () => {
			if (mapRef.current) {
				mapRef.current.remove();
				mapRef.current = null;
			}
		};
	}, [activityPolyLines]);

	return (
		<div className="heatmap-page">
			<h1>Activity Heatmap</h1>
			<div
				ref={mapContainerRef}
				id="map"
				style={{ height: "600px", width: "100%" }}
			/>
			<nav>
				<Link to="/dashboard">Dashboard</Link>
				<Link to="/">Home</Link>
			</nav>
		</div>
	);
}

export default Heatmap;
