import { ObjectId } from 'mongodb';
import { Id } from '../utils/id';

export interface NewContactDb {
    userId: ObjectId;
    phone?: string;
    email?: string;
    instagram?: string;
    facebook?: string;
}

export type ContactDb = NewContactDb & Id;
