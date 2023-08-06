import { Db } from 'mongodb';
import { NewUserDb } from '../models/user';
import { Database, DbCollections } from '../database';

export default async function usersMigrate(): Promise<void> {
    await Database.dropCollection(DbCollections.Users);

    const usersCollection = Database.getCollection(DbCollections.Users);
    await usersCollection.insertMany([
        {
            name: 'User1',
            email: 'mail1@gmail.com',
            password: 'pass1',
        } as NewUserDb,
        {
            name: 'User2',
            email: 'mail2@gmail.com',
            password: 'pass2',
        } as NewUserDb,
    ]);
}
