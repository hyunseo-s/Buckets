import { useState } from 'react';
import { Menu, Button, Modal, TextInput, Select } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconBucket, IconPlus, IconDroplet, IconUsersGroup } from '@tabler/icons-react';

export const AddButton = () => {
  const buttonColor = "rgba(23, 148, 250, 1)";
  
  const [openedAddGroup, { open: openAddGroup, close: closeAddGroup }] = useDisclosure(false);
  const [openedAddBucket, { open: openAddBucket, close: closeAddBucket }] = useDisclosure(false);
  const [openedAddItem, { open: openAddItem, close: closeAddItem }] = useDisclosure(false);

  const [groupName, setGroupName] = useState<string>('');
  const [selectedGroupOption, setSelectedGroupOption] = useState<string | null>(null);

  return (
    <>
      <Modal opened={openedAddGroup} onClose={closeAddGroup} title="Add Group">
        <form onSubmit={(e) => {
          e.preventDefault();
          console.log('Bucket Name:', groupName, 'Selected Group:', selectedGroupOption);
          closeAddGroup();
        }}>
          <TextInput
            label="Group Name"
            placeholder="Enter group name"
            value={groupName}
            onChange={(event) => setGroupName(event.currentTarget.value)}
            required
          />
          <Select
            label="Select an option"
            placeholder="Add to group"
            data={['Group 1', 'Group 2', 'Group 3']}
            value={selectedGroupOption}
            onChange={(value) => setSelectedGroupOption(value)}
            required
          />
          <Button type="submit" fullWidth mt="md">
            Add Group!
          </Button>
        </form>
      </Modal>
      
      {/* Other Modals */}
      <Modal opened={openedAddBucket} onClose={closeAddBucket} title="Add Bucket">
        {/* Add Bucket content */}
      </Modal>
      <Modal opened={openedAddItem} onClose={closeAddItem} title="Add Item">
        {/* Add Item content */}
      </Modal>

      {/* Menu */}
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <Button
            variant="filled"
            color={buttonColor}
            radius="xl"
            style={{
              position: 'absolute',
              bottom: '16px',
              right: '16px',
              width: '56px',
              height: '56px',
              padding: '0',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <IconPlus size={45} />
          </Button>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item 
            leftSection={<IconUsersGroup size={25} color={buttonColor} />}
            onClick={openAddGroup}
          >
            Add Group
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item 
            leftSection={<IconBucket size={25} color={buttonColor} />}
            onClick={openAddBucket}
          >
            Add Bucket
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item 
            leftSection={<IconDroplet size={25} color={buttonColor} />}
            onClick={openAddItem}
          >
            Add Item
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  );
};
