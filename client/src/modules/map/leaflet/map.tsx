import * as L from "leaflet";
import { RefObject } from "react";

/**
 * Initializes instance of Leaflet map and assigns it to the map reference object.
 * Disables map interactions of control overlays
 * 
 * @param mapRef Reference to the main Map object
 */
export function initMap(mapRef: RefObject<L.Map | undefined>){
    const osm = L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            attribution: "© OpenStreetMap contributors",
        },
    );

    // Initialize Leaflet map
    const mapInstance = new L.Map("map", {
        center: [50.875, -114.045], // TODO Make this dynamic based on min/max values of user's activities
        zoom: 13,
        layers: [osm],
    });

    mapRef.current = mapInstance;

    // Prevent map interactions on control overlays
    // Use requestAnimationFrame to ensure DOM elements are available
    requestAnimationFrame(() => {
        const controlsEl = document.getElementById("map-controls");
        const legendEl = document.getElementById("map-legend");

        if (controlsEl) {
            L.DomEvent.disableClickPropagation(controlsEl);
            L.DomEvent.disableScrollPropagation(controlsEl);
        }
        if (legendEl) {
            L.DomEvent.disableClickPropagation(legendEl);
            L.DomEvent.disableScrollPropagation(legendEl);
        }
    });
}