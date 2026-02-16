import { MapApp } from "../modules/map/map-app";
import MenuBar from "@/components/MenuBar";
import { Box } from "@chakra-ui/react";

export function HeatmapPage() {
	return (
		<Box className="layout heatmap-page">
			<MenuBar />
			<MapApp />
		</Box>
	);
}
