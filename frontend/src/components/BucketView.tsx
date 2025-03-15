import { Button, Dialog, Divider, Flex, Grid, Title, Text, Group, TextInput } from "@mantine/core"
import ItemCard from "./ItemCard.tsx"
import BucketMenu from "./BucketMenu.tsx";
import { PropsWithChildren, useState } from "react";
import SortMenu from "./SortMenu.tsx";

const buckets: string[] = ['Bucket 1', 'Bucket 2']

const items = [{
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

const BucketView = (props: PropsWithChildren<{title : string}>) => {
  const [active, setActive] = useState(0);
  const [edit, setEdit] = useState(false);
  const [rename, setRename] = useState(false);

  const handleSaveClick = () => {
    setEdit(false);
  }

  const handleClose = () => {
    setRename(false);
  }

  return (
  <Flex direction='column' align='flex-start' m='7%'>
    {/* Header */}
    <Flex direction='row' mb='4rem' align='center' gap='xl'>
      <Title size="h1" style={{fontWeight: "400"}}>{props.title} Buckets</Title>
      {props.children}
    </Flex>

    {/* Buckets List */}
    <Flex direction='row' justify='space-between' w='100%'>
      <Flex direction='row' gap='lg'>
        {buckets.map((bucket, index) => {
          return <BucketMenu key={index} index={index} name={bucket} isFocused={index === active} buttonListener={setActive} editListener={setEdit} renameListener={setRename}/>
        })}
      </Flex>
      <SortMenu />
    </Flex>

    <Dialog opened={rename} withCloseButton onClose={handleClose} size="lg" radius="md">
      <Text size="sm" mb="xs" fw={500}>
        Rename Bucket
      </Text>

      <Group align="flex-end">
        <TextInput placeholder="hello@gluesticker.com" style={{ flex: 1 }} />
        <Button onClick={handleClose}>Save</Button>
      </Group>
    </Dialog>

    {/* Divider */}
    <Divider mt='md' mb="3rem" w='100%'/>

    {/* Save button */}
    {edit && 
      <Flex w='100%' mb='3rem' justify='flex-end'>
          <Button onClick={handleSaveClick}>Save</Button> 
      </Flex>
    }

    {/* Items Grid */}
    <Grid px='4rem' gutter={50}>
      {items.map((item, index) => {
        return (
          <Grid.Col span={{ base: 12, sm: 6, lg: 4 }}>
            <ItemCard key={index} title={item.title} likes={item.likes} images={item.images} link={item.link} type={edit}/>
          </Grid.Col>
        )
      })}
    </Grid>
  </Flex>
  )
}

export default BucketView