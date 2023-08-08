import { ObjectId } from 'mongodb';
import { DbCollections } from '../database';
import { NewContactDb, ContactDb } from '../models/contact';
import {
    createDocument,
    deleteDocument,
    readDocument,
    updateDocument,
} from './template';

export async function createContact(newContact: NewContactDb): Promise<void> {
    return await createDocument<NewContactDb>(
        DbCollections.Contacts,
        newContact
    );
}

export async function readContact(
    query: Partial<ContactDb>
): Promise<ContactDb | null> {
    return await readDocument<ContactDb>(DbCollections.Contacts, query);
}

export async function updateContact(contact: ContactDb): Promise<void> {
    return await updateDocument<ContactDb>(DbCollections.Contacts, contact);
}

export async function deleteContact(_id: ObjectId): Promise<void> {
    return await deleteDocument(DbCollections.Contacts, _id);
}
