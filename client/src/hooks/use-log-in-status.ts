import { useEffect, useState } from "react";

/**
 * Gets log-in status of user and sets CTA values
 */
export const useLoginStatus = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	// Fetch logged in state
	useEffect(() => {
		(async () => {
			try {
				const response = await fetch("/api/auth/status", {
					credentials: "include",
				});
				if (response.ok) {
					const payload: { isLoggedIn: boolean } =
						await response.json();
					setIsLoggedIn(payload.isLoggedIn);
				}
			} catch (Error) {
				console.log("Error determing if user is logged in");
			}
		})();
	}, []);
	return [isLoggedIn];
};
