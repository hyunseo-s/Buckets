import { Modal, TextInput, MultiSelect, Button, Group, CopyButton } from "@mantine/core";
import { useEffect, useState } from "react";
import { IconCheck, IconLinkPlus } from '@tabler/icons-react';
import { handleError, handleSuccess } from "../utils/handlers";
import { useForm } from "@mantine/form";
import { get, post } from "../utils/apiClient";
import { useGroups } from "../context/GroupsProvider";

export interface User {
	id: string;
	username: string;
	email: string;
	password: string;
	groups: string[];
	friends: string[];
	buckets: string[];
}

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
			members: [],
		},

		validate: {
		},
	});

	const { refreshGroups } = useGroups();


	// Call API to get users
	const [users, setUsers] = useState<User[]>([]);
	const [members, setMembers] = useState<string[]>([]);
	const [groupName, setGroupName] = useState<string>('');

	useEffect(() => {
		const getUsernames = async () => {
			const res = await get('/users/all');
			if (res.error) {
				handleError(res.error);
				return;
			}
			setUsers(res.users);
		}

		getUsernames();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const memberIds = members.map(username => usernameToId(username));
		const params = {
			groupName: groupName,
			memberIds: memberIds
		}
		const res = await post("/group/create", params);
		
		if (res.error) {
			handleError(res.error);
			return;
		}
		handleSuccess(res.message ?? "Success!");
		setMembers([]);
		setGroupName('');
		closeAddGroup();
		refreshGroups();
	};	

	const usernameToId = (username: string) => {
		const foundUsers = users.filter(user => user.username === username);
		if (foundUsers.length == 0) return null;
		return foundUsers[0].id ?? null;
	}
		const InputStyle = {
			margin: "2rem auto",
		}
		return (
			<Modal opened={openedAddGroup} onClose={closeAddGroup} title="Add Group" centered>
				<div style={{padding: "1rem" }}>
				<form onSubmit={handleSubmit}>
        <TextInput
					style={InputStyle}
          label="Group Name"
          placeholder="Group Name"
					value={groupName}
					onChange={(e) => setGroupName(e.target.value)}
          required
					key={form.key('groupName')}
        />
        <MultiSelect
					style={InputStyle}
          label="Friends"
          placeholder="Add friends"
					value={members}
					onChange={(e) => setMembers(e)}
          data={users.map(user => user.username)} // Dynamically limited to 2 options
          searchable
					limit={6}
					key={form.key('members')}
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
