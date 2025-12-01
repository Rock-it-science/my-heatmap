import { Button, HStack, Image, Link, Text } from "@chakra-ui/react";

function MenuBar() {
	const onClickLogin = () => {
		window.location.assign("/auth/login");
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
				My Heatmap
			</Link>
			<Link href="/dashboard" textStyle="xl">
				Dashboard
			</Link>
			<Button
				onClick={onClickLogin}
				marginRight="10px"
				marginLeft="auto"
				backgroundColor="var(--light-green)"
			>
				Log in
			</Button>
		</HStack>
	);
}

export default MenuBar;
