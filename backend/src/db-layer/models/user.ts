import { Id } from '../utils/id';

export interface NewUserDb {
    name: string;
    email: string;
    password: string;
}

export type UserDb = NewUserDb & Id;
