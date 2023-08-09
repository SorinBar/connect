import { ObjectId } from 'mongodb';
import { DbCollections } from '../database';
import { NewContactDb, ContactDb } from '../models/contact';
import {
    createDocument,
    deleteDocument,
    readDocument,
    updateDocument,
} from './template';
import { Contact, NewContact } from '../../api/models/contacts';
import {
    ContactDbToContact,
    ContactToContactDb,
    NewContactToNewContactDb,
} from '../converters/contacts';

export async function createContact(newContact: NewContact): Promise<void> {
    return await createDocument<NewContactDb>(
        DbCollections.Contacts,
        NewContactToNewContactDb(newContact)
    );
}

export async function readContact(
    query: Partial<ContactDb>
): Promise<Contact | null> {
    const contact = await readDocument<ContactDb>(
        DbCollections.Contacts,
        query
    );
    if (contact === null) {
        return null;
    }
    return ContactDbToContact(contact);
}

export async function updateContact(contact: Contact): Promise<void> {
    return await updateDocument<ContactDb>(
        DbCollections.Contacts,
        ContactToContactDb(contact)
    );
}

export async function deleteContact(_id: string): Promise<void> {
    return await deleteDocument(DbCollections.Contacts, new ObjectId(_id));
}
