export interface ContactPatch {
    phone?: string;
    email?: string;
    instagram?: string;
    facebook?: string;
}

export type Contact = ContactPatch & {
    _id: string;
    userId: string;
};
