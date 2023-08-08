import { Collection, Db, MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';

export enum DbCollections {
    Users = 'users',
    Contacts = 'contacts',
}

export class Database {
    private static client: MongoClient;
    private static database: Db;

    private constructor() {}

    public static connect(): boolean {
        try {
            dotenv.config();
            this.setClient();
            this.connectToDatabase();
        } catch (error) {
            this.disconnect();
            console.log(error);
            return false;
        }

        return true;
    }

    public static disconnect(): void {
        this.client?.close();
    }

    private static setClient(): void {
        if (!process.env.MONGODB_URI) {
            throw new Error('.env: MONGODB_URI not found');
        }
        this.client = new MongoClient(process.env.MONGODB_URI);
    }

    private static connectToDatabase(): void {
        try {
            if (!process.env.MONGODB_NAME) {
                throw new Error('.env: MONGODB_NAME not found');
            }
            this.database = this.client.db(process.env.MONGODB_NAME);
        } catch (error) {
            throw error;
        }
    }

    public static getCollection(collectionName: DbCollections): Collection {
        return this.database.collection(collectionName);
    }

    public static async dropCollection(
        collectionName: DbCollections
    ): Promise<void> {
        await this.database.collection(collectionName).insertOne({});
        await this.database.dropCollection(collectionName);
    }
}
