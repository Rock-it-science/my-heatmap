import { Box, Text, Button, ListRoot, ListItem } from "@chakra-ui/react";
import MenuBar from "../components/MenuBar";
import { useLoginStatus } from "@/hooks/use-log-in-status";

export function HomePage() {
	const [isLoggedIn] = useLoginStatus();

	const cta = {
		text: isLoggedIn ? "Dashboard" : "Connect Account",
		link: isLoggedIn
			? "/heatmap"
			: `${import.meta.env.VITE_SERVER_URL}/api/user/auth`,
	};

	const onClickCTA = () => {
		window.location.assign(cta.link);
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
						Visualize your activities on an interactive heatmap
					</ListItem>
				</ListRoot>
				<Button
					onClick={onClickCTA}
					marginTop="auto"
					marginBottom="30px"
					alignSelf="center"
					backgroundColor="var(--light-green)"
					width="150px"
				>
					{cta.text}
				</Button>
			</Box>
		</Box>
	);
}
