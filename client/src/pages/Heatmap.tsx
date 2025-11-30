import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Box, Link, Text } from "@chakra-ui/react";
import * as L from "leaflet";
import MenuBar from "@/components/menu-bar";
// import "leaflet.heat";

function Heatmap() {
	const [searchParams] = useSearchParams();
	const [activityPolyLines, setActivityPolyLines] = useState<
		[number, number][][]
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

		L.polyline(activityPolyLines).addTo(map);
		// TODO Make coloured based on sport

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
		<Box className="heatmap-page">
			<MenuBar />
			<Text>Activity Heatmap</Text>
			<Box
				ref={mapContainerRef}
				id="map"
				style={{ height: "600px", width: "100%" }}
			/>
		</Box>
	);
}

export default Heatmap;
