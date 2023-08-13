import { IdString } from '../utils/idString';

export interface NewUser {
    name: string;
    email: string;
    password: string;
}

export type User = NewUser & IdString;
