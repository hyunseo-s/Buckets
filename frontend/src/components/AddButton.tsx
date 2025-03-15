import { Menu, Button } from '@mantine/core';
import { IconBucket, IconPlus, IconDroplet, IconUsersGroup } from '@tabler/icons-react';

export const AddButton = () => {
  const buttonColor = "rgba(23, 148, 250, 1)";

  return (
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
        <Menu.Item leftSection={<IconUsersGroup size={25} color={buttonColor} />}>
          Add Group
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item leftSection={<IconBucket size={25} color={buttonColor} />}>
          Add Bucket
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item leftSection={<IconDroplet size={25} color={buttonColor} />}>
          Add Item
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
