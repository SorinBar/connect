import { ObjectId } from 'mongodb';
import { NewUser, User } from '../../api/models/user';
import { NewUserDb, UserDb } from '../models/user';

export function NewUserToNewUserDb(newUser: NewUser): NewUserDb {
    return {
        ...newUser,
    };
}

export function NewUserDbToNewUser(newUserDb: NewUserDb): NewUser {
    return {
        ...newUserDb,
    };
}

export function UserToUserDb(user: User): UserDb {
    return {
        ...user,
        _id: new ObjectId(user._id),
    };
}

export function UserDbToUser(userDb: UserDb): User {
    return {
        ...userDb,
        _id: userDb._id.toHexString(),
    };
}
