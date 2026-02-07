import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DashboardPage from "./pages/Dashboard";
import HeatmapPage from "./pages/Heatmap";
import AuthErrorPage from "./pages/AuthError";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/dashboard" element={<DashboardPage />} />
				<Route path="/heatmap" element={<HeatmapPage />} />
				<Route path="/auth/error" element={<AuthErrorPage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
