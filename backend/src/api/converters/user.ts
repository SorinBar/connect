import { ObjectId } from 'mongodb';
import { NewUser, User } from '../models/userModel';
import { NewUserDb, UserDb } from '../../db-layer/models/user';

export function NewUserToNewUserDb(newUser: NewUser): NewUserDb {
    return {
        ...newUser,
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
