import { string, object } from 'yup';
import { id } from '../utils/idValidation';

export const newUserSchema = object().shape({
    name: string().required(),
    email: string().email().required(),
    password: string().required(),
});

export const userSchema = object().shape({
    _id: id().required(),
    name: string().required(),
    email: string().email().required(),
    password: string().required(),
});

export const patchUserSchema = newUserSchema;

export const userPathSchema = object().shape({
    userId: id().required(),
});
