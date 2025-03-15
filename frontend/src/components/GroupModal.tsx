import { Modal, TextInput, MultiSelect, Button, Group, CopyButton } from "@mantine/core";
import { useEffect, useState } from "react";
import { IconCheck, IconLinkPlus } from '@tabler/icons-react';
import { handleError, handleSuccess } from "../utils/handlers";
import { useForm } from "@mantine/form";
import { get } from "../utils/apiClient";

export const GroupModal = ({ 
  openedAddGroup, 
  closeAddGroup, 
}: {
  openedAddGroup: boolean;
  closeAddGroup: () => void;
}) => {

	const form = useForm({
		mode: 'uncontrolled',
		initialValues: {
			groupName: '',
			selectedFriends: [],
		},

		validate: {
		},
	});


  // Call API to get users
  const [users, setUsers] = useState([]);

	useEffect(() => {
		const generateUsernames = async () => {
			const res = await get('/users/all', {});

			if (res.error) {
				handleError(res.error);
				return;
			}
			setUsers(res.users);
		}

		generateUsernames();
	}, []);

	// e.preventDefault();
	// console.log('Group Name:', groupName);
	// console.log('Friends:', selectedFriends);
	// closeAddGroup();

	const handleSubmit = async (values) => {

		const memberIds = values.selectFriends.map(username => usernameToId(username));

		const params = {
			groupName: values.groupName,
			memberIds: memberIds
		}
		const res = await post("/group/create", params);
		
		if (res.error) {
			handleError(res.error);
			return;
		}

		handleSuccess(res.message);
	};	

	const usernameToId = (username: string) => {
		const foundUsers = users.filter(user => user.username === username);
		if (foundUsers.length == 0) return null;
		return foundUsers[0].userId ?? null;
	}

		return (
			<Modal opened={openedAddGroup} onClose={closeAddGroup} title="Add Group" centered>
				<div style={{padding: "1rem" }}>
				<form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label="Group Name"
          placeholder="Enter group name"
          required
        />
        <MultiSelect
          label="Friends"
          placeholder="Add friends"
          data={users.map(user => user.username)} // Dynamically limited to 2 options
          searchable
					limit={6}
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
			</div>
    </Modal>
  );
};
