import { Dialog, Spinner } from "@chakra-ui/react";

export function SpinnerDialog({ loading }: { loading: boolean }) {
    return (
        <Dialog.Root open={loading}>
            <Dialog.Backdrop />
            <Dialog.Content alignItems="center" width="256px" bgColor="var(--dark-gray)" >
                <Spinner size="xl" margin="24px" />
            </Dialog.Content>
        </Dialog.Root>
    )
}