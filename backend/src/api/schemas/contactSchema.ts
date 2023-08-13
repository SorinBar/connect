import { string, object } from 'yup';
import { id } from '../utils/idValidation';

export const newContactSchema = object()
    .shape({
        userId: id().required(),
        phone: string(),
        email: string().email(),
        instagram: string(),
        facebook: string(),
    })
    .noUnknown(true)
    .required()
    .strict();

export const contactSchema = object()
    .shape({
        _id: id().required(),
        userId: id().required(),
        phone: string(),
        email: string().email(),
        instagram: string(),
        facebook: string(),
    })
    .noUnknown(true)
    .required()
    .strict();

export const contactPathSchema = object()
    .shape({
        userId: id().required(),
    })
    .noUnknown(true)
    .required()
    .strict();

export const contactPatchSchema = object()
    .shape({
        phone: string(),
        email: string().email(),
        instagram: string(),
        facebook: string(),
    })
    .noUnknown(true)
    .required()
    .strict();
