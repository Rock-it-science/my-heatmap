import MenuBar from "@/components/MenuBar";
import { Box, Link, Text, VStack } from "@chakra-ui/react";

export function aboutPage() {
	return (
		<Box>
			<MenuBar />
			<VStack
				alignItems="flex-start"
				textAlign="left"
				padding="96px"
				width="60%"
			>
				<Text textStyle="2xl">About this app</Text>
				<Text>
					This app is a personoal project created by{" "}
					<Link href="https://github.com/Rock-it-science">
						Will McFarland
					</Link>
					.
				</Text>
				<Text textStyle="2xl">Security & Privacy</Text>
				<Text>
					While using this application, your Strava access token and
					refresh token obtained from the Strava API via OAuth with
					the granted scopes will be stored securely on our backend in
					memory only. A session token will be securely stored in your
					browser to identify your client with the backend. Strava
					secrets will never be exchanged to the frontend. Strava
					activity data will however be sent and stored on the browser
					in local storage. This data will not be stored on our
					backend to ensure user privacy.
				</Text>
				<Text textStyle="2xl">Attributions</Text>
				<Link
					href="https://www.flaticon.com/free-icons/heatmap"
					title="heatmap icons"
				>
					Heatmap icons created by Flowicon - Flaticon
				</Link>
			</VStack>
		</Box>
	);
}
