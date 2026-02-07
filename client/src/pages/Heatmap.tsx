import { MapApp } from "@/components/map/map-app";
import MenuBar from "@/components/MenuBar";
import { Box } from "@chakra-ui/react";

function HeatmapPage() {
	return (
		<Box className="layout heatmap-page">
			<MenuBar />
			<MapApp/>
		</Box>
	)
}

export default HeatmapPage;
