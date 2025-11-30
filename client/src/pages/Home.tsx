import { Box, Text, Button, ListRoot, ListItem } from "@chakra-ui/react";
import MenuBar from "../components/menu-bar";

function Home() {
	const onClickStravaAuth = () => {
		window.location.assign("/auth/login");
	};
	return (
		<Box
			display="flex"
			alignItems="center"
			height="100vh"
			backgroundColor="var(--light-yellow)"
			backgroundImage="url(/map-bg.png)"
		>
			<MenuBar />
			<Box
				width="300px"
				height="400px"
				margin="auto"
				background="var(--dark-gray)"
				borderRadius="16px"
				display="flex"
				flexDirection="column"
			>
				<Text
					textAlign="center"
					textStyle="xl"
					margin="30px auto"
					display="block"
				>
					My Heatmap
				</Text>
				<ListRoot width="80%" margin="30px" display="block">
					<ListItem>
						Visualize your Strava activities on an interactive
						heatmap
					</ListItem>
				</ListRoot>
				<Button
					onClick={onClickStravaAuth}
					marginTop="auto"
					marginBottom="30px"
					alignSelf="center"
					backgroundColor="var(--light-green)"
					width="150px"
				>
					Connect Strava
				</Button>
			</Box>
		</Box>
	);
}

export default Home;
