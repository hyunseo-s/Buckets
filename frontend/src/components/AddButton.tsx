import { useEffect, useState } from 'react';
import { Menu, Button, Modal, TextInput, Select, FileInput, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconBucket, IconPlus, IconDroplet, IconUsersGroup } from '@tabler/icons-react';
import { GroupModal } from './GroupModal';
import { ItemModal } from './ItemModal';
import { BucketModal } from './BucketModal';


export const AddButton = () => {
  const buttonColor = "rgba(23, 148, 250, 1)";
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

    useEffect(() => {
      const updateToken = () => setToken(localStorage.getItem("token"));
  
      // Listen for storage changes (works across tabs)
      window.addEventListener("storage", updateToken);
  
      // Also listen for manual token updates
      const interval = setInterval(() => {
        const currentToken = localStorage.getItem("token");
        setToken(currentToken);
      }, 500); // Poll every 500ms to detect changes
  
      return () => {
        window.removeEventListener("storage", updateToken);
        clearInterval(interval);
      };
    }, []);

  
  // Modal opens
  const [openedAddGroup, { open: openAddGroup, close: closeAddGroup }] = useDisclosure(false);
  const [openedAddBucket, { open: openAddBucket, close: closeAddBucket }] = useDisclosure(false);
  const [openedAddItem, { open: openAddItem, close: closeAddItem }] = useDisclosure(false);

  return (
    <>
      {token && <>
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <Button
              variant="filled"
              color={buttonColor}
              radius="xl"
              style={{
                position: 'fixed',
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
        < GroupModal openedAddGroup={openedAddGroup} closeAddGroup={closeAddGroup} />
        < ItemModal openedAddItem={openedAddItem} closeAddItem={closeAddItem} />
        < BucketModal openedAddBucket={openedAddBucket} closeAddBucket={closeAddBucket} />
      </>}
    </>
  );
};
