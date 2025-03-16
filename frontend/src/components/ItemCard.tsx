import { Card, Text, Group, Anchor, Image, ActionIcon, Flex } from '@mantine/core';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import { useEffect, useState } from 'react';
import { Carousel } from '@mantine/carousel'
import { handleError } from '../utils/handlers';
import { get, put } from '../utils/apiClient';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useNavigate } from 'react-router';

const CAROUSEL_HEIGHT = 325

export type ItemDetails = {
    id: string
    title: string,
    desc: string,
    type: boolean,
    likes: string[],
    images: string[],
    link: string
}

const ItemCard = (props: ItemDetails) => {
  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [visible, setVisible] = useState(true);
  const navigate = useNavigate();

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

  const handleLike = async () => {
    const res = await put("/item/toggleLike", { itemId : props.id });
    if (res.error) {
      handleError(res.error);
      return;
    }

    if (like) {
      setLikeCount(likeCount - 1)
    } else {
      setLikeCount(likeCount + 1)
    }

    setLike(!like);
  }

  const handleVisibility = () => {
    setVisible(!visible)
  }

  const handleCardClick = () => {
    navigate(`/calendar/${props.id}`)
  }

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder component="a" onClick={handleCardClick}>
      <Card.Section>
        {visible ? 
          <Carousel height={CAROUSEL_HEIGHT} withIndicators={props.images.length !== 1} withControls={props.images.length !== 1}>
            {props.images.length > 0 && props.images.map((image, index) => {
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
              <Text>{props.desc}</Text>
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