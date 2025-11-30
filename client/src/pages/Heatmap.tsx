import { useEffect, useRef, useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import * as L from "leaflet";
import MenuBar from "@/components/menu-bar";
import "leaflet.heat";

function Heatmap() {
	const [activityPolyLines, setActivityPolyLines] = useState<
		{
			// TODO Make this a contract that is synced with server code
			activityId: number;
			polylinePoints: [number, number][];
			name: string;
			sportType: string;
			color: string;
		}[]
	>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const mapRef = useRef<L.Map | null>(null);
	const mapContainerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		fetchActivities();
	}, []);

	async function fetchActivities() {
		try {
			setLoading(true);
			const response = await fetch("/api/activities/polylines");
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
			[50.875, -114.045], // TODO Make this dynamic based on min/max values of user's activities
			13,
		);

		// Add OpenStreetMap tiles
		L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
			attribution: "© OpenStreetMap contributors",
		}).addTo(map);

		let allCoords: [number, number, number][] = [];
		for (const activity of activityPolyLines) {
			// L.polyline(activity.polylinePoints, {
			// 	color: activity.color,
			// }).addTo(map);
			for (const activityPoints of activity.polylinePoints) {
				allCoords.push([activityPoints[0], activityPoints[1], 0.35]); // Third value here is intensity
			}
		}
		L.heatLayer(allCoords, { radius: 10 }).addTo(map);

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
		<html>
			<head>
				<link
					rel="stylesheet"
					href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
					integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
					crossOrigin=""
				/>
			</head>
			<Box className="layout heatmap-page">
				<MenuBar />
				<Text>Activity Heatmap</Text>
				<Box
					ref={mapContainerRef}
					id="map"
					style={{ height: "90vh", width: "100%" }}
				/>
			</Box>
		</html>
	);
}

export default Heatmap;
