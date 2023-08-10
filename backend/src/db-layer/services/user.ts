import { ObjectId } from 'mongodb';
import { DbCollections } from '../database';
import { NewUserDb, UserDb } from '../models/user';
import {
    createDocument,
    deleteDocument,
    readDocument,
    updateDocument,
} from './template';

export async function createUser(newUserDb: NewUserDb): Promise<void> {
    return await createDocument<NewUserDb>(DbCollections.Users, newUserDb);
}

export async function readUser(query: Partial<UserDb>): Promise<UserDb | null> {
    return await readDocument<UserDb>(DbCollections.Users, query);
}

export async function updateUser(userDb: UserDb): Promise<void> {
    return await updateDocument<UserDb>(DbCollections.Users, userDb);
}

export async function deleteUser(_id: string): Promise<void> {
    return await deleteDocument(DbCollections.Users, new ObjectId(_id));
}
