import { UserDb } from '../../db-layer/models/user';
import {
    createUserDb,
    deleteUserDb,
    readAllUsersDb,
    readUserDb,
    updateUserDb,
} from '../../db-layer/services/user';
import {
    NewUserToNewUserDb,
    UserDbToUser,
    UserToUserDb,
} from '../converters/user';
import { NewUser, User } from '../models/userModel';

export async function createUser(newUser: NewUser): Promise<void> {
    return await createUserDb(NewUserToNewUserDb(newUser));
}

export async function readUser(query: Partial<UserDb>): Promise<User | null> {
    const user = await readUserDb(query);
    if (!user) {
        return null;
    }
    return UserDbToUser(user);
}

export async function readAllUsers(query: Partial<UserDb>): Promise<User[]> {
    const users = await readAllUsersDb(query);
    return users.map((userDb) => UserDbToUser(userDb));
}

export async function updateUser(user: User): Promise<void> {
    return await updateUserDb(UserToUserDb(user));
}

export async function deleteUser(_id: string): Promise<void> {
    return await deleteUserDb(_id);
}
