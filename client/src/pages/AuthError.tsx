import { Link } from "react-router-dom";

export function AuthErrorPage() {
	return (
		<div className="auth-error-page">
			<h1>Authentication Error</h1>
			<p>There was an error connecting to Strava. Please try again.</p>
			<a href="/strava/auth" className="button">
				Try Again
			</a>
			<Link to="/">Go Home</Link>
		</div>
	);
}
