import { ObjectId } from 'mongodb';
import { string, object } from 'yup';
import { id } from '../utils/idValidation';

export const newUserSchema = object().shape({
    name: string().required(),
    username: string().required(),
    password: string().required(),
});

export const userSchema = object().shape({
    _id: id().required(),
    name: string().required(),
    username: string().required(),
    password: string().required(),
});
