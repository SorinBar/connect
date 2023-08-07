import { Database } from './database';
import { ExitCodes } from './utils/codes';
import usersMigrate from './migrations/user';
import contactsMigrate from './migrations/contact';

async function migrate() {
    try {
        if (!Database.connect()) {
            process.exit(ExitCodes.DbConnect);
        }
        console.log('Connected successfully to MongoDB');
        console.log(`Started migration:`);

        await usersMigrate();
        await contactsMigrate();

        Database.disconnect();
        console.log('Migrations completed successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

migrate();
