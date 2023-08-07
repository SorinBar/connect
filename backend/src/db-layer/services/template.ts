import { ObjectId } from 'mongodb';
import { Database, DbCollections } from '../database';
import { Id } from '../utils/id';

export async function createDocument<T extends Object>(
    collectionName: DbCollections,
    newDocument: T
): Promise<void> {
    try {
        await Database.getCollection(collectionName).insertOne(newDocument);
    } catch (error) {
        console.log(error);
    }
}

export async function readDocument<T extends Object>(
    collectionName: DbCollections,
    _id: ObjectId
): Promise<T | null> {
    let document: T | null = null;
    try {
        document = (await Database.getCollection(collectionName).findOne({
            _id,
        })) as T | null;
    } catch (error) {
        console.log(error);
    }
    return document;
}

export async function updateDocument<T extends Object & Id>(
    collectionName: DbCollections,
    document: T
): Promise<void> {
    try {
        await Database.getCollection(collectionName).updateOne(
            { _id: document._id },
            { $set: document }
        );
    } catch (error) {
        console.log(error);
    }
}

export async function deleteDocument(
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
