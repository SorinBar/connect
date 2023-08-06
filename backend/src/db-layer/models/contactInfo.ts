import { ObjectId } from 'mongodb';
import { Id } from '../utils/id';

export interface NewContactInfoDb {
    userId: ObjectId;
    phone?: string;
    email?: string;
    instagram?: string;
    facebook?: string;
}

export type ContactInfoDb = NewContactInfoDb & Id;
