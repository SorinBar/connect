import { Database, DbCollections } from '../database';
import { NewUserDb } from '../models/user';
import { createUser } from '../services/user';

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
