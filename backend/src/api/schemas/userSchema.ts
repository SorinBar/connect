import { string, object } from 'yup'

export const userSchema = object().shape({
    name: string().required(),
    username: string().required(),
    password: string().required(),
})
