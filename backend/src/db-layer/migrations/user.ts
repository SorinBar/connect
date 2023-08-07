import { NewUserDb } from '../models/user';
import { Database, DbCollections } from '../database';
import { createUser, readUser, readUserByEmail } from '../services/user';
import { ObjectId } from 'mongodb';

export default async function usersMigrate(): Promise<void> {
    console.log(`Collection: ${DbCollections.Users}`);

    await Database.dropCollection(DbCollections.Users);

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

    console.log(`Done ${DbCollections.Users}`);
}
