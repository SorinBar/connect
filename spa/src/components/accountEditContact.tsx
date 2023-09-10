import React, { useEffect, useState } from 'react';
import { SessionData } from '../models/sessionModel';
import { getSession } from '../utils/sessionCookies';
import { Contact, ContactPatch } from '../models/contactModel';
import axios from 'axios';
import { Alert, Button, Grid, Snackbar, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { contactPatchSchema } from '../schemas/contactSchema';
import SaveIcon from '@mui/icons-material/Save';

const URL = 'http://localhost:3000/contact/';

const AccountEditContact = () => {
    const [contact, setContact] = useState<Contact | undefined>(undefined);
    const [openSnack, setOpenSnack] = useState(false);
    const [severitySnack, setSeveritySnack] = useState<
        'success' | 'error' | undefined
    >(undefined);
    const [messageSnack, setMessageSnack] = useState<string | undefined>(
        undefined
    );

    const handleSubmit = async (contactPatch: ContactPatch) => {
        const session: SessionData | undefined = getSession();
        if (contact && session) {
            const clearPatchContact: ContactPatch = {};
            const config = {
                headers: {
                    Authorization: `Bearer ${session.token}`,
                },
            };

            Object.keys(contactPatch).forEach((keyStr) => {
                const key = keyStr as keyof ContactPatch;
                if (contactPatch[key] !== '') {
                    clearPatchContact[key] = contactPatch[key];
                }
            });

            try {
                const response = await axios.patch(
                    URL + session.userId,
                    clearPatchContact,
                    config
                );
                setMessageSnack(response.data.message);
                setSeveritySnack('success');
                setOpenSnack(true);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    setMessageSnack(error.response?.data.message);
                } else {
                    setMessageSnack('Unknown error');
                }
                setSeveritySnack('error');
                setOpenSnack(true);
            }
        }
    };

    const onCloseSnack = () => {
        setOpenSnack(false);
    };

    const formik = useFormik({
        initialValues: {
            phone: '',
            email: '',
            instagram: '',
            facebook: '',
        } as ContactPatch,
        onSubmit: (values: ContactPatch) => {
            handleSubmit(values);
        },
        validationSchema: contactPatchSchema,
    });

    useEffect(() => {
        load();
    }, []);

    const load = async () => {
        const session: SessionData | undefined = getSession();
        if (session) {
            const config = {
                headers: {
                    Authorization: `Bearer ${session.token}`,
                },
            };
            try {
                const response = await axios.get(URL + session.userId, config);
                setContact(response.data);
                setFormikValues(response.data);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.log(error.response?.data);
                } else {
                    console.log('Unknown error');
                }
            }
        }
    };

    const setFormikValues = (contact: Contact) => {
        const { _id, userId, ...contactPatch } = contact;

        Object.keys(contactPatch).forEach((key) => {
            formik.setFieldValue(key, contact[key as keyof Contact]);
        });
    };

    return (
        <div>
            <Grid
                container
                direction={'column'}
                padding={1}
                paddingLeft={2}
                paddingRight={2}
            >
                <Grid item>
                    <form onSubmit={formik.handleSubmit}>
                        <TextField
                            fullWidth
                            id="phone"
                            name="phone"
                            label="Phone"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                                formik.touched.phone &&
                                Boolean(formik.errors.phone)
                            }
                            helperText={
                                formik.touched.phone && formik.errors.phone
                            }
                            margin="dense"
                        />
                        <TextField
                            fullWidth
                            id="email"
                            name="email"
                            label="Email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                                formik.touched.email &&
                                Boolean(formik.errors.email)
                            }
                            helperText={
                                formik.touched.email && formik.errors.email
                            }
                            margin="dense"
                        />
                        <TextField
                            fullWidth
                            id="instagram"
                            name="instagram"
                            label="Instagram"
                            value={formik.values.instagram}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                                formik.touched.instagram &&
                                Boolean(formik.errors.instagram)
                            }
                            helperText={
                                formik.touched.instagram &&
                                formik.errors.instagram
                            }
                            margin="dense"
                        />
                        <TextField
                            fullWidth
                            id="facebook"
                            name="facebook"
                            label="Facebook"
                            value={formik.values.facebook}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                                formik.touched.facebook &&
                                Boolean(formik.errors.facebook)
                            }
                            helperText={
                                formik.touched.facebook &&
                                formik.errors.facebook
                            }
                            margin="dense"
                        />
                        <Grid item marginTop={'8px'}>
                            <Button
                                startIcon={<SaveIcon />}
                                color="primary"
                                variant="contained"
                                fullWidth
                                type="submit"
                                disabled={!(formik.isValid && formik.dirty)}
                            >
                                Update Contact
                            </Button>
                        </Grid>
                    </form>
                </Grid>
            </Grid>
            <Snackbar
                open={openSnack}
                autoHideDuration={4000}
                onClose={onCloseSnack}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
            >
                <Alert severity={severitySnack} onClose={onCloseSnack}>
                    {messageSnack}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default AccountEditContact;
