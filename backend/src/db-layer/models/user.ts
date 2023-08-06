import { ObjectId } from 'mongodb';

export interface NewUserDb {
    name: string;
    email: string;
    password: string;
}

export type UserDb = NewUserDb & {
    _id: ObjectId;
};
