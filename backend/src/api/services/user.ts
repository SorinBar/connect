import { UserDb } from '../../db-layer/models/user';
import {
    createUserDb,
    deleteUserDb,
    readUserDb,
    updateUserDb,
} from '../../db-layer/services/user';
import { NewUserToNewUserDb, UserToUserDb } from '../converters/user';
import { NewUser, User } from '../models/userModel';

export async function createUser(newUser: NewUser): Promise<void> {
    return await createUserDb(NewUserToNewUserDb(newUser));
}

export async function readUser(query: Partial<UserDb>): Promise<UserDb | null> {
    return await readUserDb(query);
}

export async function updateUser(user: User): Promise<void> {
    return await updateUserDb(UserToUserDb(user));
}

export async function deleteUser(_id: string): Promise<void> {
    return await deleteUserDb(_id);
}
