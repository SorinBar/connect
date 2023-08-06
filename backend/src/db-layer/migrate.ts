import usersMigrate from './migrations/user';
import { Database } from './database';

async function migrate() {
    try {
        Database.connect();
        console.log('Connected successfully to MongoDB');
        console.log(`Started migration: ${Database.dbName}`);

        await usersMigrate();

        Database.disconnect();
        console.log('Migrations completed successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

migrate();
