import { Database, DbCollections } from '../database';
import { createUser } from '../services/user';
import { NewUser } from '../../api/models/user';

export default async function usersMigrate(): Promise<void> {
    console.log(`Collection: ${DbCollections.Users}`);

    await Database.dropCollection(DbCollections.Users);

    await createUser({
        name: 'User1',
        email: 'mail1@gmail.com',
        password: 'pass1',
    } as NewUser);

    await createUser({
        name: 'User2',
        email: 'mail2@gmail.com',
        password: 'pass2',
    } as NewUser);

    console.log(`Done ${DbCollections.Users}`);
}
