import { ObjectId } from 'mongodb';
import { Contact, NewContact } from '../models/contactModel';
import { ContactDb, NewContactDb } from '../../db-layer/models/contact';

export function NewContactToNewContactDb(newContact: NewContact): NewContactDb {
    return {
        ...newContact,
        userId: new ObjectId(newContact.userId),
    };
}

export function ContactToContactDb(contact: Contact): ContactDb {
    return {
        ...contact,
        userId: new ObjectId(contact.userId),
        _id: new ObjectId(contact._id),
    };
}

export function ContactDbToContact(contactDb: ContactDb): Contact {
    return {
        ...contactDb,
        userId: contactDb._id.toHexString(),
        _id: contactDb._id.toHexString(),
    };
}
