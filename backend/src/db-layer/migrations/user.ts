import { NewUserDb, UserDb } from '../models/user';
import { Database, DbCollections } from '../database';
import { createUser, deleteUser, readUser, updateUser } from '../services/user';
import { ObjectId } from 'mongodb';

export default async function usersMigrate(): Promise<void> {
    console.log(`Collection: ${DbCollections.Users}`);

    // await Database.dropCollection(DbCollections.Users);

    const usersCollection = Database.getCollection(DbCollections.Users);

    await createUser({
        name: 'User1',
        email: 'mail1@gmail.com',
        password: 'pass1',
    } as NewUserDb);

    await createUser({
        name: 'User2',
        email: 'mail2@gmail.com',
        password: 'pass2',
    } as NewUserDb);

    const user = await readUser(new ObjectId('64cfc1808b50a1dceff1973c'));
    console.log(user);

    await updateUser({
        _id: new ObjectId('64cfc1808b50a1dceff1973c'),
        name: 'X',
        email: 'modified@gmail.com',
        password: 'modified',
    } as UserDb);

    await deleteUser(new ObjectId('64cfb576af7c8ea25db2c891'));

    console.log(`Done ${DbCollections.Users}`);
}
