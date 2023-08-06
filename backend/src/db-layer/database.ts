import { Collection, Db, MongoClient } from 'mongodb';

export enum DbCollections {
    Users = 'users',
}

export class Database {
    private static username = 'sorin';
    private static password = 'Password123$';
    private static url =
        'mongodb://' +
        this.username +
        ':' +
        this.password +
        '@localhost:27017/?authMechanism=DEFAULT';

    public static dbName = 'ConnectDb';

    private static client: MongoClient;
    private static database: Db;

    private constructor() {}

    public static connect(): boolean {
        let success = false;
        try {
            this.setClient();
            this.connectToDatabase();

            success = true;
        } catch (error) {
            this.disconnect();
            console.log(error);
        }

        return success;
    }

    public static disconnect(): void {
        this.client?.close();
    }

    private static setClient(): void {
        this.client = new MongoClient(this.url);
    }

    private static connectToDatabase(): void {
        try {
            this.database = this.client.db(this.dbName);
        } catch (error) {
            throw error;
        }
    }

    public static getCollection(collectionName: DbCollections): Collection {
        return this.database.collection(DbCollections.Users);
    }

    public static async dropCollection(
        collectionName: DbCollections
    ): Promise<void> {
        await this.database.collection(collectionName).insertOne({});
        await this.database.dropCollection(collectionName);
    }
}
