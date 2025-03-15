export interface Database {
    users: User[];
    groups: Group[];
    buckets: Bucket[];
    items: Item[];
}

export interface User {
    id: string;
    username: string;
    email: string;
    password: string;
    groups: string[];
    friends: string[];
    buckets: string[];
}

export interface Group {
    groupId: string;
    groupName: string;
    members: string[];
    buckets: string[];
    images: string[];
}

export interface Bucket {
    bucketId: string;
    bucketName: string;
    groupId: string;
    items: string[];
    images: string[];
}

export interface Item {
    itemId: string;
    itemName: string;
    itemDesc: string;
    itemUrl: string;
    addedBy: string;
    images: string[];
    likes: number;
    bucketId: string;
    active: boolean;
}