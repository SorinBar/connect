export interface NewUser {
    name: string;
    email: string;
    password: string;
}

export type UserPatch = NewUser;

export type User = NewUser & {
    _id: string;
};
