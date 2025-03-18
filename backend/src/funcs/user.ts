import { getData } from './dataStore';

export function getUser(userId: string) {
    const database = getData();
    const users = database.users;

    const user = users.find(user => user.id === userId);
    if (!user) {
        throw new Error(`User with ID ${userId} not found`);
    }

    return user;
}
