import {
	Text,
	VStack,
	Table,
	defaultSystem,
	ChakraProvider,
} from "@chakra-ui/react";
import { createRoot } from "react-dom/client";
import { ActivityPolyline } from "@/types";

export function popupElement(activity: ActivityPolyline) {
	const popupContainer = document.createElement("div");
	const root = createRoot(popupContainer);
	root.render(
		<ChakraProvider value={defaultSystem}>
			<VStack>
				<Text textStyle="lg">{activity.name}</Text>
				<Table.Root>
					<Table.Body>
						<Table.Row>
							<Table.Cell>Sport Type</Table.Cell>
							<Table.Cell>{activity.sportType}</Table.Cell>
						</Table.Row>
					</Table.Body>
				</Table.Root>
			</VStack>
		</ChakraProvider>,
	);
	return popupContainer;
}
