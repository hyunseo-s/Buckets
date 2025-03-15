import { getData } from './dataStore'
import { v4 } from 'uuid';

function createItem(
	id: string, 
	name: string, 
	desc: string, 
	uri: string, 
	image: string, 
	bucketId: string
) {
	const data = getData();

	data.items.push({
		itemId: v4(),
		itemName: name,
    itemDesc: desc,
    itemUrl: uri,
    addedBy: id,
    images: image,
    likes: 0,
		bucketId,
	});

	return {};
}

function removeItem(itemId: string) {
	const data = getData();

	const index = data.items.findIndex(item => item.itemId === itemId);
	if (index === -1) throw new Error('No such item exists');

	data.items.splice(index, 1);

	return {}
}

export {
  createItem,
	removeItem,
}