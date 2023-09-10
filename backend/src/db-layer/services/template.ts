import { ObjectId } from 'mongodb';
import { Database, DbCollections } from '../database';
import { Id } from '../utils/id';

export async function createDocumentDb<T extends Object>(
    collectionName: DbCollections,
    newDocument: T
): Promise<void> {
    try {
        await Database.getCollection(collectionName).insertOne(newDocument);
    } catch (error) {
        console.log(error);
    }
}

export async function readDocumentDb<T extends Object>(
    collectionName: DbCollections,
    query: Partial<T>
): Promise<T | null> {
    let document: T | null = null;
    try {
        document = (await Database.getCollection(collectionName).findOne(
            query
        )) as T | null;
    } catch (error) {
        console.log(error);
    }
    return document;
}

export async function readAllDocumentsDb<T extends Object>(
    collectionName: DbCollections,
    query: Partial<T>
): Promise<T[]> {
    let documents: T[] = [];
    try {
        documents = (await Database.getCollection(collectionName)
            .find(query)
            .toArray()) as unknown as T[];
    } catch (error) {
        console.log(error);
    }
    return documents;
}

export async function updateDocumentDb<T extends Object & Id>(
    collectionName: DbCollections,
    document: T
): Promise<void> {
    try {
        await Database.getCollection(collectionName).replaceOne(
            { _id: document._id },
            document
        );
    } catch (error) {
        console.log(error);
    }
}

export async function deleteDocumentDb(
    collectionName: DbCollections,
    _id: ObjectId
): Promise<void> {
    try {
        await Database.getCollection(collectionName).deleteOne({
            _id,
        });
    } catch (error) {
        console.log(error);
    }
}
