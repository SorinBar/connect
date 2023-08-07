import usersMigrate from './migrations/user';
import { Database } from './database';
import { ExitCodes } from './utils/codes';

async function migrate() {
    try {
        if (!Database.connect()) {
            process.exit(ExitCodes.DbConnect);
        }
        console.log('Connected successfully to MongoDB');
        console.log(`Started migration:`);

        await usersMigrate();

        Database.disconnect();
        console.log('Migrations completed successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

migrate();
