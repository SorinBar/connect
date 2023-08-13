import { ObjectId } from 'mongodb';
import { Contact } from '../models/contactModel';
import { readContact, updateContact } from '../services/contact';

export class ContactController {
    public static async getContactByUserId(
        userId: string
    ): Promise<Contact | null> {
        return await readContact({ userId: new ObjectId(userId) });
    }

    public static async patchContact(contact: Contact): Promise<void> {
        return await updateContact(contact);
    }
}
