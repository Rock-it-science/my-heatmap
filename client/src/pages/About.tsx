import { Link, Text, VStack } from "@chakra-ui/react";

export function aboutPage() {
	return (
		<VStack>
			<Text textStyle="2xl">About this app</Text>
			<Text>
				This app is a personoal project created by{" "}
				<Link href="https://github.com/Rock-it-science">
					Will McFarland
				</Link>
				.
			</Text>
			<Text textStyle="2xl">Attributions</Text>
			<Link
				href="https://www.flaticon.com/free-icons/heatmap"
				title="heatmap icons"
			>
				Heatmap icons created by Flowicon - Flaticon
			</Link>
		</VStack>
	);
}
