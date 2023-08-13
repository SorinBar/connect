import { ContactDb } from '../../db-layer/models/contact';
import {
    createContactDb,
    deleteContactDb,
    readContactDb,
    updateContactDb,
} from '../../db-layer/services/contact';
import {
    ContactDbToContact,
    ContactToContactDb,
    NewContactToNewContactDb,
} from '../converters/contacts';
import { Contact, NewContact } from '../models/contactModel';

export async function createContact(newContact: NewContact): Promise<void> {
    return await createContactDb(NewContactToNewContactDb(newContact));
}

export async function readContact(
    query: Partial<ContactDb>
): Promise<Contact | null> {
    const contact = await readContactDb(query);
    if (!contact) {
        return contact;
    }
    return ContactDbToContact(contact);
}

export async function updateContact(contact: Contact): Promise<void> {
    return await updateContactDb(ContactToContactDb(contact));
}

export async function deleteContact(_id: string): Promise<void> {
    return await deleteContactDb(_id);
}
