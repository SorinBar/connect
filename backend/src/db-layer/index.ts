import { Database, DbCollections } from './database';
import { NewUserDb } from './models/user';

const test = async () => {
    console.log(Database.connect());

    const usersCollection = Database.getCollection(DbCollections.Users);

    await usersCollection.insertOne({
        name: 'User3',
        email: 'mail3@gmail.com',
        password: 'pass3',
    } as NewUserDb);

    Database.disconnect();
};

test();
