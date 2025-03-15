import { useState } from 'react';
import { Menu, Button, Modal, TextInput, Select, FileInput, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconBucket, IconPlus, IconDroplet, IconUsersGroup } from '@tabler/icons-react';


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


  return (
    <>
      {/* Add Group Modal FELIX */}
      <Modal opened={openedAddGroup} onClose={closeAddGroup} title="Add Group" centered>
        {/* Form content for Add Group */}
      </Modal>
      
      {/* Add Bucket Modal */}
      <Modal opened={openedAddBucket} onClose={closeAddBucket} title="Add Bucket" centered>
        <form onSubmit={(e) => {
          e.preventDefault();
          console.log('Bucket Name:', bucketName, 'Selected Group:', selectedBucketGroupOption);
          closeAddBucket();
        }}>
          <TextInput
            label="Bucket Name"
            placeholder="Enter bucket name"
            value={bucketName}
            onChange={(event) => setBucketName(event.currentTarget.value)}
            required
          />
          <Select
            label="Add to group"
            placeholder="Select group"
            data={['Group 1', 'Group 2', 'Group 3']}
            value={selectedBucketGroupOption}
            onChange={(value) => setBucketSelectedGroupOption(value)}
            required
          />
          <Button type="submit" fullWidth mt="md" color={buttonColor}>
            Add Bucket!
          </Button>
        </form>
      </Modal>

      {/* Add Item Modal */}
      <Modal opened={openedAddItem} onClose={closeAddItem} title="Add Item" centered>
        <form onSubmit={(e) => {
          e.preventDefault();
          console.log('Item Name:', itemName, 'Item URL:', itemURL);
          closeAddItem();
        }}>
          <TextInput
            label="Item Name"
            placeholder="Enter item name"
            value={itemName}
            onChange={(event) => setItemName(event.currentTarget.value)}
            required
          />
          <TextInput
            label="Item URL"
            placeholder="Enter item URL"
            value={itemURL}
            onChange={(event) => setItemURL(event.currentTarget.value)}
          />
          <FileInput
            label="Upload Item Images"
            placeholder="Choose images"
            value={itemImage}
            onChange={setItemImage}
            accept="image/*"
            clearable
            multiple
          />
          <Group>
            <Select
              label="Add to group"
              placeholder="Select group"
              data={['Group 1', 'Group 2', 'Group 3']}
              // value={selectedBucketGroupOption}
              // onChange={(value) => setBucketSelectedGroupOption(value)}
              required
            />
            <Select
              label="Add to bucket"
              placeholder="Select bucket"
              data={['Bucket 1', 'Bucket 2', 'Bucket 3']}
              value={selectedBucketGroupOption}
              onChange={(value) => setBucketSelectedGroupOption(value)}
              required
              disabled
            />
          </Group>
          <Button type="submit" fullWidth mt="md" color={buttonColor}>
            Add Item!
          </Button>
        </form>
      </Modal>

      {/* Floating Add Button Menu */}
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
