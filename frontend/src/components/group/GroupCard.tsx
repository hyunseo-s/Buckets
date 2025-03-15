// https://ui.mantine.dev/category/article-cards/#image-card
import { IconUser, IconBucket } from '@tabler/icons-react';
import { Card, Center, Group, Text, useMantineTheme } from '@mantine/core';
import { Group as GroupType } from "../../types";

interface GroupCardProps {
	group: GroupType;
}

export const GroupCard = ({ group }: GroupCardProps) => {
  const theme = useMantineTheme();

  // Define styles as variables
  const cardStyle = {
    position: 'relative',
    height: '280px',
		minWidth: '200px',
    backgroundColor: 'light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-6))',
    ':hover': {
      '& .image': {
        transform: 'scale(1.03)',
      },
    },
  };

  const imageStyle = {
    position: 'absolute',
    inset: 0,
    backgroundSize: 'cover',
    transition: 'transform 500ms ease',
		backgroundImage: 'url(https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80)'
  };

  const overlayStyle = {
    position: 'absolute',
    top: '20%',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.85) 90%)',
  };

  const contentStyle = {
    height: '100%',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    zIndex: 1,
  };

  const titleStyle = {
    color: 'var(--mantine-color-white)',
    marginBottom: '5px',
  };

  const bodyTextStyle = {
    color: 'var(--mantine-color-dark-2)',
    marginLeft: '7px',
  };

  const authorStyle = {
    color: 'var(--mantine-color-dark-2)',
  };

  return (
    <Card
      p="lg"
      shadow="lg"
			m={{ base: 'auto', sm: '0' }}
      style={cardStyle}
			w={{ base: '90%', sm: '45%' }}
      radius="md"
      component="a"
      href="https://mantine.dev/"
      target="_blank"
    >
      <div className="image" style={imageStyle} />
      <div style={overlayStyle} />

      <div style={contentStyle}>
        <div>
          <Text size="lg" style={titleStyle} weight={500}>
						{group.groupName}
          </Text>

          <Group justify="space-between" gap="xs">
            <Text size="sm" style={authorStyle}>
              {group.groupName}
            </Text>
            <Group gap="lg">
              <Center>
                <IconBucket size={16} stroke={1.5} color={theme.colors.dark[2]} />
                <Text size="sm" style={bodyTextStyle}>
                  {group.buckets.length}
                </Text>
              </Center>
              <Center>
                <IconUser size={16} stroke={1.5} color={theme.colors.dark[2]} />
                <Text size="sm" style={bodyTextStyle}>
									{group.members.length}
                </Text>
              </Center>
            </Group>
          </Group>
        </div>
      </div>
    </Card>
  );
}
