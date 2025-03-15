export interface Database {
    users: User[];
    group: Groups[];
    buckets: Buckets[];
    items: Items[];
  }

export interface User {
    id: string;
    username: string;
    password: string;
    groups: string[];
    friends: string[];
    buckets: string[];
}

export interface Groups {
    groupId: string;
    groupName: string,
    members: string[],
    buckets: string[]
}

export interface Buckets {
    bucketId: string;
    bucketName: string;
    gid: string;
    items: string[]
}

export interface Items {
    itemId: string;
    bucketId: string;
    itemDesc: string;
    itemUrl: string;
    addedBy: string;
    images: string;
    likes: number;
}