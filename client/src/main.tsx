import { Provider } from "@/components/ui/provider";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";

import { HomePage, DashboardPage, HeatmapPage } from "./pages";
import "@/styles/global.scss";

const router = createBrowserRouter([
	{
		path: "/",
		Component: HomePage,
	},
	{
		path: "dashboard",
		Component: DashboardPage,
	},
	{
		path: "heatmap",
		Component: HeatmapPage,
	},
]);

const root = document.getElementById("root");
if (!root) {
	throw new Error("Failed to find the root element");
}

ReactDOM.createRoot(root).render(
	<StrictMode>
		<Provider>
			<RouterProvider router={router} />
		</Provider>
	</StrictMode>,
);
