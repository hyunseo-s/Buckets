import { Card, Text, Group, Anchor, Image, ActionIcon, Flex } from '@mantine/core';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import { useEffect, useState } from 'react';
import { Carousel } from '@mantine/carousel'
import { handleError } from '../utils/handlers';
import { get, post } from '../utils/apiClient';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const CAROUSEL_HEIGHT = 325

export type ItemDetails = {
    title: string,
    type: boolean,
    likes: string[],
    images: string[],
    link: string
}

const ItemCard = (props: ItemDetails) => {
  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(props.likes.length);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const userId = async () => {
      const raw = await get('/users/me');
      if (props.likes.length > 0 && props.likes.includes(raw.id)) {
        setLike(true)
      } else {
        setLike(false)
      }
    }

    userId()
  }, [props.likes])

  const handleLike = async (v) => {
    const raw = await post("/item/toggleLike", v);
    if (raw.error) {
      handleError(raw.error);
      return;
    }

    const res: {likes: string[]} = JSON.parse(raw);
    setLikeCount(res.likes.length)
  }

  const handleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        {visible ? 
          <Carousel height={CAROUSEL_HEIGHT} withIndicators={props.images.length !== 1} withControls={props.images.length !== 1}>
            {props.images.map((image, index) => {
                return (
                  <Carousel.Slide key={index}>
                    <Image src={image} radius="md" h={CAROUSEL_HEIGHT} onError={(e) => (e.currentTarget.src = "https://archive.org/download/placeholder-image//placeholder-image.jpg")}/>
                  </Carousel.Slide>
                )
            })}
          </Carousel>
          : <Flex h={CAROUSEL_HEIGHT} p='lg' direction='column' gap='lg'>
            <Text c={'gray'}>Description</Text>
            <div style={{width: '100%', height: '100%', overflow: 'auto'}}>
              <Text>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make</Text>
            </div>
          </Flex>
        }
      </Card.Section>
      <Group justify='space-between' mt={'md'}>
        <Group gap="xs" align='center'>
          <Text fw={500}>{props.title}</Text>
          <ActionIcon variant="light" color='gray' radius="xl" aria-label="More Details Button" onClick={handleVisibility}><MoreHorizIcon /></ActionIcon>
        </Group>
        {props.type
          ? <ActionIcon variant="light" color="red" radius="xl" aria-label="Delete Button">
            <CloseRoundedIcon/>
          </ActionIcon>
          : <Group gap="xs" align='center'>
              {like ? <FavoriteRoundedIcon color='error' onClick={handleLike} /> : <FavoriteBorderRoundedIcon onClick={handleLike}/>}
              <Text size='sm'>{likeCount}</Text>
              <Anchor href={props.link} target="_blank" c={'blue'}><OpenInNewRoundedIcon/></Anchor>
          </Group>
        }
      </Group>
    </Card>
  )
}

export default ItemCard