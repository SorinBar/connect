import { string, object } from 'yup';

export const contactPatchSchema = object().shape({
    phone: string(),
    email: string().email(),
    instagram: string(),
    facebook: string(),
});
