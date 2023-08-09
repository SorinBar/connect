import { ObjectId } from 'mongodb';
import { DbCollections } from '../database';
import { NewUser, User } from '../../api/models/user';
import { NewUserDb, UserDb } from '../models/user';
import {
    createDocument,
    deleteDocument,
    readDocument,
    updateDocument,
} from './template';
import {
    NewUserToNewUserDb,
    UserDbToUser,
    UserToUserDb,
} from '../converters/user';

export async function createUser(newUser: NewUser): Promise<void> {
    return await createDocument<NewUserDb>(
        DbCollections.Users,
        NewUserToNewUserDb(newUser)
    );
}

export async function readUser(query: Partial<UserDb>): Promise<User | null> {
    const userDb = await readDocument<UserDb>(DbCollections.Users, query);
    if (userDb === null) {
        return null;
    }
    return UserDbToUser(userDb);
}

export async function updateUser(user: User): Promise<void> {
    return await updateDocument<UserDb>(
        DbCollections.Users,
        UserToUserDb(user)
    );
}

export async function deleteUser(_id: string): Promise<void> {
    return await deleteDocument(DbCollections.Users, new ObjectId(_id));
}
