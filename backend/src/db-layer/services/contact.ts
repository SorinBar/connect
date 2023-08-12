import { ObjectId } from 'mongodb';
import { DbCollections } from '../database';
import { NewContactDb, ContactDb } from '../models/contact';
import {
    createDocumentDb,
    deleteDocumentDb,
    readDocumentDb,
    updateDocumentDb,
} from './template';

export async function createContactDb(
    newContactDb: NewContactDb
): Promise<void> {
    return await createDocumentDb<NewContactDb>(
        DbCollections.Contacts,
        newContactDb
    );
}

export async function readContactDb(
    query: Partial<ContactDb>
): Promise<ContactDb | null> {
    return await readDocumentDb<ContactDb>(DbCollections.Contacts, query);
}

export async function updateContactDb(contactDb: ContactDb): Promise<void> {
    return await updateDocumentDb<ContactDb>(DbCollections.Contacts, contactDb);
}

export async function deleteContactDb(_id: string): Promise<void> {
    return await deleteDocumentDb(DbCollections.Contacts, new ObjectId(_id));
}
