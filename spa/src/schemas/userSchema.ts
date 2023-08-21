import { string, object } from 'yup';

export const newUserSchema = object().shape({
    name: string().required(),
    email: string().email().required(),
    password: string().required(),
});
