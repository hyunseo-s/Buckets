import { Modal, TextInput, MultiSelect, Button, Group, CopyButton } from "@mantine/core";
import { useState } from "react";
import { IconCheck, IconLinkPlus } from '@tabler/icons-react';

export const GroupModal = ({ 
  openedAddGroup, 
  closeAddGroup, 
}: {
  openedAddGroup: boolean;
  closeAddGroup: () => void;
}) => {
  const [groupName, setGroupName] = useState<string>('');
  const [selectedFriends, setSelectedFriends] = useState<string[]>([]);

  // Call API to get users
  const [users] = useState<string[]>(['John', 'Ana', 'Kim', 'Richard']);
  const availableUsers = users.filter((user) => !selectedFriends.includes(user)).slice(0, 6);

  return (
    <Modal opened={openedAddGroup} onClose={closeAddGroup} title="Add Group" centered>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log('Group Name:', groupName);
          console.log('Friends:', selectedFriends);
          closeAddGroup();
        }}
      >
        <TextInput
          label="Group Name"
          placeholder="Enter group name"
          value={groupName}
          onChange={(event) => setGroupName(event.currentTarget.value)}
          required
        />
        <MultiSelect
          label="Friends"
          placeholder="Add friends"
          data={availableUsers} // Dynamically limited to 2 options
          searchable
          value={selectedFriends}
          onChange={setSelectedFriends}
          hidePickedOptions
        />
        <Group wrap="nowrap">
          <CopyButton value="https://mantine.dev">
            {({ copied, copy }) => (
              <Button
                onClick={copy}
                color={copied ? 'teal' : ''}
                fullWidth
                mt="md"
                variant={copied ? "" : "default"}
                leftSection={
                  copied ? (
                    <IconCheck size={20} color="white" />
                  ) : (
                    <IconLinkPlus size={20} color="rgba(23, 148, 250, 1)" />
                  )
                }
                style={{
                  border: copied ? '' : '1px solid rgba(23, 148, 250, 1)',
                  color: copied ? 'white' : 'rgba(23, 148, 250, 1)',
                }}
              >
                {copied ? 'Copied link' : 'Copy invite link'}
              </Button>
            )}
          </CopyButton>
          <Button type="submit" fullWidth mt="md" color="rgba(23, 148, 250, 1)">
            Add Group!
          </Button>
        </Group>
      </form>
    </Modal>
  );
};
