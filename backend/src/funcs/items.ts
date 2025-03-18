import { getData } from './dataStore'
import { v4 } from 'uuid';
import { Item } from '../interface';
import { getBucket } from './buckets';

interface CreateItemType {
    itemName: string, 
    itemDesc: string, 
    itemUrl: string, 
    addedBy: string, 
    images: string[], 
    likes: string[], 
    bucketIds: string[],
    active: boolean
}

interface EditItemType {
    itemId: string, 
    itemName: string, 
    itemDesc: string,
    itemUrl: string, 
    itemImage: string[],
    bucketId: string,
    acitve: boolean
}

// Function to create the group, given the name and the members
export function createItem({itemName, itemDesc, itemUrl, addedBy, images, bucketIds}: CreateItemType) {
  const database = getData();
  const items = database.items;
  for (const bucketId of bucketIds) {
		const itemId = v4();
    const item: Item = {
      itemId,
      itemName,
      itemDesc,
      itemUrl,
      addedBy,
      images,
      likes: [],
      bucketId: bucketId,
      active: true,
    };

    items.push(item);
		const bucket = getBucket(bucketId);
		console.log(bucket);
		if (bucket) {
			bucket.items.push(itemId);
		}
	}

  return { message: 'Item added to buckets!' }
}

export function editItem({ itemId, itemName, itemDesc, itemUrl, itemImage, bucketId }: EditItemType) {
  const database = getData();
  const items = database.items;

  const itemIndex = items.findIndex(item => item.itemId === itemId);
  
  if (itemIndex === -1) {
      throw new Error(`Item with ID ${itemId} not found`);
  }

  // Update only provided fields
  if (itemName) items[itemIndex].itemName = itemName;
  if (itemDesc) items[itemIndex].itemDesc = itemDesc;
  if (itemUrl) items[itemIndex].itemUrl = itemUrl;
  if (itemImage) items[itemIndex].images = itemImage;
  if (bucketId) items[itemIndex].bucketId = bucketId;

  return { message: "Item successfully edited" }
}

// Function to remove an item given the itemId
export function removeItem(itemId: string) {
  const database = getData();
  const items = database.items;

  const itemExists = items.some(item => item.itemId === itemId);
  
  if (!itemExists) {
      throw new Error(`Item with ID ${itemId} not found`);
  }

  database.items = items.filter(item => item.itemId !== itemId);

  return { message: "Successfully removed item" }
}

export function upvoteItem(itemId: string, id: string) {
    const database = getData();
    const items = database.items;

    const index = items.findIndex((item) => item.itemId === itemId);
    
    if (index === -1) {
      items[index].likes.push(id);
    } else {
      items.splice(index, 1);
    }

    return { likes: items[index].likes};
}

export function toggleActiveItem(itemId: string) {
    const database = getData();
    const items = database.items;

    const itemIndex = items.findIndex(item => item.itemId === itemId);
    
    if (itemIndex === -1) {
        throw new Error(`Item with ID ${itemId} not found`);
    }

    items[itemIndex].active = false;
}