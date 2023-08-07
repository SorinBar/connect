import { Database, DbCollections } from '../database';
import { createContact } from '../services/userContact';
import { NewContactDb } from '../models/contact';
import { readUserByEmail } from '../services/user';

export default async function contactsMigrate(): Promise<void> {
    console.log(`Collection: ${DbCollections.Contacts}`);

    await Database.dropCollection(DbCollections.Contacts);

    const user1 = await readUserByEmail('mail1@gmail.com');
    const user2 = await readUserByEmail('mail2@gmail.com');

    await createContact({
        userId: user1?._id,
        phone: '0723847620',
    } as NewContactDb);

    await createContact({
        userId: user2?._id,
        phone: '0727827126',
    } as NewContactDb);

    console.log(`Done ${DbCollections.Contacts}`);
}
