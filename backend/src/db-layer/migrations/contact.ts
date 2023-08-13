import { ObjectId } from 'mongodb';
import { NewContact } from '../../api/models/contactModel';
import { Database, DbCollections } from '../database';
import {
    createContactDb,
    deleteContactDb,
    readContactDb,
    updateContactDb,
} from '../services/contact';
import { readUserDb } from '../services/user';
import { NewContactDb } from '../models/contact';

export default async function contactsMigrate(): Promise<void> {
    console.log(`Collection: ${DbCollections.Contacts}`);

    await Database.dropCollection(DbCollections.Contacts);

    const user1 = await readUserDb({ email: 'mail1@gmail.com' });
    const user2 = await readUserDb({ email: 'mail2@gmail.com' });

    if (user1 != null) {
        await createContactDb({
            userId: user1._id,
            phone: '0723847620',
        } as NewContactDb);
    }
    if (user2 != null) {
        await createContactDb({
            userId: user2._id,
            phone: '0727827126',
        } as NewContactDb);
    }

    console.log(`Done ${DbCollections.Contacts}`);
}
