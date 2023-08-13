import { ObjectId } from 'mongodb';
import { Contact, NewContact } from '../models/contactModel';
import { createContact, readContact, updateContact } from '../services/contact';

export class ContactController {
    public static async getContactByUserId(
        userId: string
    ): Promise<Contact | null> {
        return await readContact({ userId: new ObjectId(userId) });
    }

    public static async addContact(
        newContact: NewContact
    ): Promise<Contact | null> {
        await createContact(newContact);
        return await this.getContactByUserId(newContact.userId);
    }

    public static async patchContact(contact: Contact): Promise<void> {
        return await updateContact(contact);
    }
}
