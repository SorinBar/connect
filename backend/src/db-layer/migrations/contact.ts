import { ObjectId } from 'mongodb';
import { NewContact } from '../../api/models/contacts';
import { Database, DbCollections } from '../database';
import {
    createContact,
    deleteContact,
    readContact,
    updateContact,
} from '../services/contacts';
import { readUser } from '../services/user';

export default async function contactsMigrate(): Promise<void> {
    console.log(`Collection: ${DbCollections.Contacts}`);

    await Database.dropCollection(DbCollections.Contacts);

    const user1 = await readUser({ email: 'mail1@gmail.com' });
    const user2 = await readUser({ email: 'mail2@gmail.com' });

    if (user1 != null) {
        await createContact({
            userId: user1._id,
            phone: '0723847620',
        } as NewContact);
    }
    if (user2 != null) {
        await createContact({
            userId: user2._id,
            phone: '0727827126',
        } as NewContact);
    }

    console.log(`Done ${DbCollections.Contacts}`);
}
