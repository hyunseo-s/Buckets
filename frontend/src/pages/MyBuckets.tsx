import { Button, Divider, Flex, Grid, Title } from "@mantine/core"
import ItemCard, { ItemDetails } from "../components/ItemCard.tsx"
import DropdownMenu from "../components/DropdownMenu.tsx";
import { useState } from "react";
import SwapVertRoundedIcon from '@mui/icons-material/SwapVertRounded';

const buckets: string[] = ['Bucket 1', 'Bucket 2']

const items : ItemDetails[] = [{
  title: 'Hello',
  likes: 1,
  images: ['https://www.ramblers.com.au/wp-content/uploads/2017/04/dsc_0043_28150455396_o-1200x800.jpg', 'https://www.ramblers.com.au/wp-content/uploads/2017/04/dsc_0043_28150455396_o-1200x800.jpg'],
  link: 'https://www.ramblers.com.au/blog/sunset-skydives/'
},{
  title: 'Hello',
  likes: 1,
  images: ['https://www.ramblers.com.au/wp-content/uploads/2017/04/dsc_0043_28150455396_o-1200x800.jpg', 'https://www.ramblers.com.au/wp-content/uploads/2017/04/dsc_0043_28150455396_o-1200x800.jpg'],
  link: 'https://www.ramblers.com.au/blog/sunset-skydives/'
},{
  title: 'Hello',
  likes: 1,
  images: ['https://www.ramblers.com.au/wp-content/uploads/2017/04/dsc_0043_28150455396_o-1200x800.jpg', 'https://www.ramblers.com.au/wp-content/uploads/2017/04/dsc_0043_28150455396_o-1200x800.jpg'],
  link: 'https://www.ramblers.com.au/blog/sunset-skydives/'
},{
  title: 'Hello',
  likes: 1,
  images: ['https://www.ramblers.com.au/wp-content/uploads/2017/04/dsc_0043_28150455396_o-1200x800.jpg', 'https://www.ramblers.com.au/wp-content/uploads/2017/04/dsc_0043_28150455396_o-1200x800.jpg'],
  link: 'https://www.ramblers.com.au/blog/sunset-skydives/'
}]

const MyBuckets = () => {
  const [active, setActive] = useState(0);

  return (
  <Flex direction='column' align='flex-start' m='7%'>
    <Flex direction='row' mb='4rem'>
      <Title size="h1" style={{fontWeight: "400"}}>My Buckets</Title>
    </Flex>
    <Flex direction='row' justify='space-between' w='100%'>
      <Flex direction='row' gap='lg'>
        {buckets.map((bucket, index) => {
          return <DropdownMenu key={index} index={index} name={bucket} isFocused={index === active} listener={setActive}/>
        })}
      </Flex>
      <Button variant='subtle' leftSection={<SwapVertRoundedIcon color="primary"/>}>Sort</Button>
    </Flex>
    <Divider mt='md' mb="3rem" w='100%'/>
    <Grid px='4rem' gutter={50}>
      {items.map((item, index) => {
        return (
          <Grid.Col span={{ base: 12, sm: 6, lg: 4 }}>
            <ItemCard key={index} title={item.title} likes={item.likes} images={item.images} link={item.link} />
          </Grid.Col>
        )
      })}
    </Grid>
  </Flex>
  )
}

export default MyBuckets