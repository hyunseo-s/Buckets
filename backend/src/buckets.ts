import { Buckets } from './interface';
import { v4 as uuidv4 } from 'uuid';

//
//
//
//
//
//
//
const database = {};

// pass through name, group id
// returns bucket id
export function createBucket(bucketName: String, groupId: String) {
    //let database = getData();
    let buckets = database["buckets"];
    let id = uuidv4();
    
    let Bucket = {
        bucketId: id,
        bucketName: bucketName,
        gId: groupId,
        items: []
    };

    buckets.push(Bucket);

    return id;
}

// pass through bucketId
// return true or false
export function deleteBucket(findBucketId: String) {
    //let database = getData();
    let buckets = database["buckets"];
    const bucketExists = buckets.some(bucket => bucket.bucketId === findBucketId);
    
    if (!bucketExists) {
        throw new Error(`Bucket with ID ${findBucketId} not found`);
    }

    return buckets.filter(bucket => bucket.bucketId !== findBucketId);

}

export function getBucket(findBucketId: String) {
    //let database = getData();
    let buckets = database["buckets"];

    return buckets.filter(bucket => bucket.bucketId === findBucketId);
}

export function getAllBuckets(groupId: String) {
    //let database = getData();
    let buckets = database["buckets"];

    return buckets.filter(bucket => bucket.gId === groupId);
}