import { Modal } from "@mantine/core"

export const GroupModal = ({ openedAddGroup, closeAddGroup }) => {
    return (
        <Modal opened={openedAddGroup} onClose={closeAddGroup} title="Add Group" centered>
        {/* Form content for Add Group */}
        </Modal>
    )
}