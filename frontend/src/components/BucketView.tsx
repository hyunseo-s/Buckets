import { Button, Dialog, Divider, Flex, Grid, Title, Text, Group, TextInput } from "@mantine/core"
import ItemCard from "./ItemCard.tsx"
import BucketMenu from "./BucketMenu.tsx";
import { PropsWithChildren, useEffect, useState } from "react";
import SortMenu from "./SortMenu.tsx";
import { get } from "../utils/apiClient.ts";
import { Bucket, Item } from "../types.ts";
import { useGroups } from "../context/GroupsProvider.tsx";

const BucketView = (props: PropsWithChildren<{title : string, buckets: Bucket[]}>) => {
  const [active, setActive] = useState<number | null>(null);
  const [edit, setEdit] = useState(false);
  const [rename, setRename] = useState(false);
  const {items, refreshItemsOfBucket } = useGroups()

	useEffect(() => {
		if (props.buckets && props.buckets.length > 0) {
			setActive(0);
		}
	}, [])

  useEffect(() => {
		if (active === null) {
			return;
		}
		console.log("lol");
    refreshItemsOfBucket(props.buckets[active].bucketId);
  }, [active])

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
        {props.buckets && props.buckets.length > 0 && props.buckets.map((bucket, index) => {
          return <BucketMenu key={index} index={index} name={bucket.bucketName} isFocused={index === active} buttonListener={setActive} editListener={setEdit} renameListener={setRename}/>
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
      {items[props.buckets[active ?? 0].bucketId].items && items[props.buckets[active ?? 0].bucketId].items.length > 0 && items[props.buckets[active ?? 0].bucketId].items.map((item, index) => {
        return (
          <Grid.Col span={{ base: 12, sm: 6, lg: 4 }}>
            <ItemCard key={index} title={item.itemName} likes={item.likes} images={[item.images]} link={item.itemUrl} type={edit}/>
          </Grid.Col>
        )
      })}
    </Grid>
  </Flex>
  )
}

export default BucketView