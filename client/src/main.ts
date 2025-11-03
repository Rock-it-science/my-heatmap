import * as L from "leaflet";
// import "leaflet.heat";

// Initialize the map when the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
	const mapElement = document.getElementById("map");
	if (mapElement) {
		// Initialize Leaflet map
		const map = L.map("map").setView([51.505, -0.09], 13);

		// Add OpenStreetMap tiles
		L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
			attribution: "© OpenStreetMap contributors",
		}).addTo(map);

		console.log("Map initialized successfully");
	}
});
