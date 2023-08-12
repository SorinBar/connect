import { ObjectId } from 'mongodb';
import { DbCollections } from '../database';
import { NewUserDb, UserDb } from '../models/user';
import {
    createDocumentDb,
    deleteDocumentDb,
    readAllDocumentsDb,
    readDocumentDb,
    updateDocumentDb,
} from './template';

export async function createUserDb(newUserDb: NewUserDb): Promise<void> {
    return await createDocumentDb<NewUserDb>(DbCollections.Users, newUserDb);
}

export async function readUserDb(
    query: Partial<UserDb>
): Promise<UserDb | null> {
    return await readDocumentDb<UserDb>(DbCollections.Users, query);
}

export async function readAllUsersDb(
    query: Partial<UserDb>
): Promise<UserDb[]> {
    return await readAllDocumentsDb(DbCollections.Users, query);
}

export async function updateUserDb(userDb: UserDb): Promise<void> {
    return await updateDocumentDb<UserDb>(DbCollections.Users, userDb);
}

export async function deleteUserDb(_id: string): Promise<void> {
    return await deleteDocumentDb(DbCollections.Users, new ObjectId(_id));
}
