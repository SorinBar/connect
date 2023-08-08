import { ObjectId } from 'mongodb';
import { DbCollections } from '../database';
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

export async function readUser(query: Partial<UserDb>): Promise<UserDb | null> {
    return await readDocument<UserDb>(DbCollections.Users, query);
}

export async function updateUser(user: UserDb): Promise<void> {
    return await updateDocument<UserDb>(DbCollections.Users, user);
}

export async function deleteUser(_id: ObjectId): Promise<void> {
    return await deleteDocument(DbCollections.Users, _id);
}
