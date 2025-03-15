import { getData } from './dataStore';
import { Group, User } from '../interface';
import { v4 as uuidv4 } from 'uuid';

export function getUser(userId: string) {
    const database = getData();
    const users = database.users;

    let user = users.find(user => user.id === userId);
    if (!user) {
        throw new Error(`User with ID ${userId} not found`);
    }

    return user;
}
