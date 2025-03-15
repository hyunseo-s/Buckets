import { getData } from './dataStore';
import { Bucket, Item } from '../interface';
import { v4 } from 'uuid';

// This function takes in the bucket name and group id, and returns the bucket id
export function createBucket(bucketName: string, groupId: string) {
    const database = getData();
    const buckets = database.buckets;
    
    const bucketId = v4();

    const bucket: Bucket = {
      bucketId: bucketId,
      bucketName: bucketName,
      groupId: groupId,
      items: []
    };

    buckets.push(bucket);

    return bucketId;
}

// Function to delete the given bucketId
export function deleteBucket(findBucketId: string) {

  const database = getData();
  const buckets = database.buckets;

  const bucketExists = buckets.some(bucket => bucket.bucketId === findBucketId);
  
  if (!bucketExists) {
    throw new Error(`Bucket with ID ${findBucketId} not found`);
  }

  return buckets.filter(bucket => bucket.bucketId !== findBucketId);
}

export function getBucket(findBucketId: string) {
  const database = getData();
  const buckets = database.buckets;
  return buckets.filter(bucket => bucket.bucketId === findBucketId);
}

export function getAllBuckets(groupId: string) {
  const database = getData();
  const buckets = database.buckets;

  return buckets.filter(bucket => bucket.groupId === groupId);
}

export function getBucketItems(bucketId: string) {
  const database = getData();
  
  const bucket = database.buckets.find((bucket: Bucket) => bucket.bucketId === bucketId);

  return bucket.items.map((id: string) => database.items.find((item: Item) => item.itemId === id))
}