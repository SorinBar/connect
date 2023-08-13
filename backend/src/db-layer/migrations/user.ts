import { Database, DbCollections } from '../database';
import { NewUserDb } from '../models/user';
import { createUserDb } from '../services/user';

export default async function usersMigrate(): Promise<void> {
    console.log(`Collection: ${DbCollections.Users}`);

    await Database.dropCollection(DbCollections.Users);

    await createUserDb({
        name: 'User1',
        email: 'mail1@gmail.com',
        password: 'pass1',
    } as NewUserDb);

    await createUserDb({
        name: 'User2',
        email: 'mail2@gmail.com',
        password: 'pass2',
    } as NewUserDb);

    console.log(`Done ${DbCollections.Users}`);
}
