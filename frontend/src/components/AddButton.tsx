import { useState } from 'react';
import { Menu, Button, Modal, TextInput, Select, FileInput, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconBucket, IconPlus, IconDroplet, IconUsersGroup } from '@tabler/icons-react';
import { GroupModal } from './GroupModal';
import { ItemModal } from './ItemModal';
import { BucketModal } from './BucketModal';


export const AddButton = () => {
  const buttonColor = "rgba(23, 148, 250, 1)";
  
  // Modal opens
  const [openedAddGroup, { open: openAddGroup, close: closeAddGroup }] = useDisclosure(false);
  const [openedAddBucket, { open: openAddBucket, close: closeAddBucket }] = useDisclosure(false);
  const [openedAddItem, { open: openAddItem, close: closeAddItem }] = useDisclosure(false);

  // Add bucket form data
  const [bucketName, setBucketName] = useState<string>('');
  const [selectedBucketGroupOption, setBucketSelectedGroupOption] = useState<string | null>(null);

  // Add group form data
  
  
  // Add item form data
  const [itemName, setItemName] = useState<string>('');
  const [itemURL, setItemURL] = useState<string>('');
  const [itemImage, setItemImage] = useState<File[]>([]);
  // const [itemBuckets, setItemBuckets] = useState<List>([]);
  const [itemAllocations, setItemAllocations] = useState([{ bucketId: null, groupId: null }]);

  const groups = [
    {
      groupId: "justin",
      groupName: "justin1"
    },
    {
      groupId: "edison",
      groupName: "edison1"
    },
    {
      groupId: "elizabeth",
      groupName: "elizabeth1"
    },
  ]

  const buckets = [
    {
      groupId: "justin",
      bucketName: "justinBucket",
      bucketId: "justinBBA"
    },
    {
      groupId: "justin",
      bucketName: "justinBucket2",
      bucketId: "justinBBB"
    },
    {
      groupId: "justin",
      bucketName: "justinBucket3",
      bucketId: "justinBBC"
    },
    {
      groupId: "elizabeth",
      bucketName: "elizabethBucket",
      bucketId: "elizabethBBA"
    },
    {
      groupId: "elizabeth",
      bucketName: "elizabethBucket2",
      bucketId: "elizabethBBB"
    },
    {
      groupId: "edison",
      bucketName: "edisonBucket2",
      bucketId: "edisonBBB"
    },
  ]

  return (
    <>
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
      < GroupModal openedAddGroup={openedAddGroup} closeAddGroup={closeAddGroup} />
      < ItemModal openedAddItem={openedAddItem} closeAddItem={closeAddItem} />
      < BucketModal openedAddBucket={openedAddBucket} closeAddBucket={closeAddBucket} />
    </>
  );
};
