import { Container, Divider, Flex, Title } from "@mantine/core"
import ItemCard, { ItemDetails } from "../components/ItemCard.tsx"
import DropdownMenu from "../components/DropdownMenu.tsx";
import { useState } from "react";

const buckets: string[] = ['Bucket 1', 'Bucket 2']

const items : ItemDetails[] = [{
  title: 'Hello',
  likes: 1,
  images: ['https://www.ramblers.com.au/wp-content/uploads/2017/04/dsc_0043_28150455396_o-1200x800.jpg', 'https://www.ramblers.com.au/wp-content/uploads/2017/04/dsc_0043_28150455396_o-1200x800.jpg'],
  link: 'https://www.ramblers.com.au/blog/sunset-skydives/'
}]

const MyBuckets = () => {
  const [active, setActive] = useState(0);

  return (
  <Flex direction='column' align='flex-start'>
      <Title size="h1" style={{fontWeight: "400"}}>My Buckets</Title>
    <Flex direction='row' gap="lg">
      {buckets.map((bucket, index) => {
        console.log(active)
        console.log(index)
        console.log(index === active)
        return <DropdownMenu key={index} name={bucket} isFocused={index === active} listener={setActive}/>
      })}
    </Flex>
    <Divider mt='md' mb="3rem" w='100%'/>
    <Container size={325} >
      {items.map((item, index) => {
        return (
          <ItemCard key={index} title={item.title} likes={item.likes} images={item.images} link={item.link} />
        )
      })}
    </Container>
  </Flex>
  )
}

export default MyBuckets