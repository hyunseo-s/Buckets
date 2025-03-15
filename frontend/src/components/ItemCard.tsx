import { Card, Text, Group, Anchor, Image } from '@mantine/core';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import InsertLinkRoundedIcon from '@mui/icons-material/InsertLinkRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import { useState } from 'react';
import { Carousel } from '@mantine/carousel'

const CAROUSEL_HEIGHT = 325

export type ItemDetails = {
    title: string,
    likes: number,
    images: string[],
    link: string
}

const ItemCard = (props: ItemDetails) => {
  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(props.likes)

  const handleLike = () => {
    if (like) {
        setLikeCount(likeCount - 1)
    } else {
        setLikeCount(likeCount + 1)
    }

    setLike(!like)
  }

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Carousel height={CAROUSEL_HEIGHT} withIndicators={props.images.length !== 1} withControls={props.images.length !== 1}>
            {props.images.map((image, index) => {
                return (
                    <Carousel.Slide key={index}>
                        <Image src={image} radius="md" h={CAROUSEL_HEIGHT}/>
                    </Carousel.Slide>
                )
            })}
        </Carousel>
      </Card.Section>
      <Group justify='space-between' mt={'md'}>
        <Text fw={500}>{props.title}</Text>
        <Group gap="xs" align='center'>
          {like ? <FavoriteRoundedIcon color='error' onClick={handleLike} /> : <FavoriteBorderRoundedIcon onClick={handleLike}/>}
          <Text size='sm'>{likeCount}</Text>
          <Anchor href={props.link} target="_blank" c={'blue'}><InsertLinkRoundedIcon/></Anchor>
        </Group>
      </Group>
    </Card>
  )
}

export default ItemCard