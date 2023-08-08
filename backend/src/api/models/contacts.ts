import { IdString } from '../utils/idString';

export interface NewContact {
    userId: string;
    phone?: string;
    email?: string;
    instagram?: string;
    facebook?: string;
}

export type Contact = NewContact & IdString;
