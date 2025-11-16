import { Link } from "react-router-dom";

function Home() {
	return (
		<div className="home-page">
			<h1>My Heatmap</h1>
			<p>Visualize your Strava activities on an interactive heatmap</p>
			<a href="/strava/auth" className="button">
				Connect Strava
			</a>
		</div>
	);
}

export default Home;
