import { object, string } from 'yup';

export const signInSchema = object().shape({
    email: string().email().required(),
    password: string().required(),
});

export const signUpSchema = object().shape({
    name: string().required(),
    email: string().email().required(),
    password: string().required(),
});
