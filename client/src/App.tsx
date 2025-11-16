import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Heatmap from "./pages/Heatmap";
import AuthError from "./pages/AuthError";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="/heatmap" element={<Heatmap />} />
				<Route path="/auth/error" element={<AuthError />} />
				<Route path="/strava/activities" element={<Dashboard />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
