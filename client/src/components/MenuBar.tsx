import { useLoginStatus } from "@/hooks/use-log-in-status";
import { Button, HStack, Image, Link, Text } from "@chakra-ui/react";

function MenuBar() {
	const [isLoggedIn] = useLoginStatus();

	const cta = {
		text: isLoggedIn ? "Dashboard" : "Connect Account",
		link: isLoggedIn ? "/heatmap" : "http://localhost:8085/api/user/auth",
	};

	const onClickCTA = () => {
		window.location.assign(cta.link);
	};

	return (
		<HStack
			position="absolute"
			top="0px"
			left="0px"
			width="100%"
			height="60px"
			gap="50px"
			backgroundColor="var(--dark-gray)"
		>
			<Link href="/">
				<Image
					src="https://cdn-icons-png.flaticon.com/512/6868/6868953.png"
					width="50px"
				/>
			</Link>
			<Link href="/heatmap" textStyle="xl">
				<Text>My Heatmap</Text>
			</Link>
			<Link href="/dashboard" textStyle="xl">
				<Text>Dashboard</Text>
			</Link>
			<Button
				onClick={onClickCTA}
				marginRight="10px"
				marginLeft="auto"
				backgroundColor="var(--light-green)"
			>
				<Text>{cta.text}</Text>
			</Button>
		</HStack>
	);
}

export default MenuBar;
