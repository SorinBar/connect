import { ObjectId } from 'mongodb';
import { DbCollections } from '../database';
import { NewContactDb, ContactDb } from '../models/contact';
import {
    createDocument,
    deleteDocument,
    readDocument,
    updateDocument,
} from './template';

export async function createContact(newContactDb: NewContactDb): Promise<void> {
    return await createDocument<NewContactDb>(
        DbCollections.Contacts,
        newContactDb
    );
}

export async function readContact(
    query: Partial<ContactDb>
): Promise<ContactDb | null> {
    return await readDocument<ContactDb>(DbCollections.Contacts, query);
}

export async function updateContact(contactDb: ContactDb): Promise<void> {
    return await updateDocument<ContactDb>(DbCollections.Contacts, contactDb);
}

export async function deleteContact(_id: string): Promise<void> {
    return await deleteDocument(DbCollections.Contacts, new ObjectId(_id));
}
