import { ObjectId } from 'mongodb';
import { Database, DbCollections } from '../database';
import { NewUserDb, UserDb } from '../models/user';
import {
    createDocument,
    deleteDocument,
    readDocument,
    updateDocument,
} from './template';

export async function createUser(newUser: NewUserDb): Promise<void> {
    return await createDocument<NewUserDb>(DbCollections.Users, newUser);
}

export async function readUser(_id: ObjectId): Promise<UserDb | null> {
    return await readDocument<UserDb>(DbCollections.Users, _id);
}

export async function updateUser(user: UserDb): Promise<void> {
    return await updateDocument<UserDb>(DbCollections.Users, user);
}

export async function deleteUser(_id: ObjectId): Promise<void> {
    return await deleteDocument(DbCollections.Users, _id);
}

export async function readUserByEmail(email: string): Promise<UserDb | null> {
    let document: UserDb | null = null;
    try {
        document = (await Database.getCollection(DbCollections.Users).findOne({
            email,
        })) as UserDb | null;
    } catch (error) {
        console.log(error);
    }
    return document;
}
