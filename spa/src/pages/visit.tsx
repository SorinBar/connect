import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Contact, ContactPatch } from '../models/contactModel';
import axios from 'axios';
import { Grid, Typography } from '@mui/material';

const URL_CONTACT = 'http://localhost:3000/contact/';
const URL_USER = 'http://localhost:3000/user/';

const Visit = () => {
    const { userId } = useParams();
    const [contactInfo, setContactInfo] = useState<ContactPatch | undefined>(
        undefined
    );
    const [name, setName] = useState<string | undefined>(undefined);
    const [contactList, setContactList] = useState<JSX.Element[]>([]);

    useEffect(() => {
        loadContact();
        loadName();
    }, []);

    useEffect(() => {
        if (!contactInfo) {
            return;
        }
        const contactListAux: JSX.Element[] = [];

        Object.keys(contactInfo).forEach((keyStr) => {
            const key = keyStr as keyof ContactPatch;
            contactListAux.push(
                <Grid
                    item
                    container
                    direction={'row'}
                    paddingLeft={6}
                    paddingTop={1}
                >
                    <Typography marginRight={2}>{keyStr + ':'}</Typography>
                    <Typography>{contactInfo[key]}</Typography>
                </Grid>
            );
        });

        setContactList(contactListAux);
    }, [contactInfo]);

    const loadContact = async () => {
        try {
            const response = await axios.get(URL_CONTACT + userId);
            genContactInfo(response.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log(error.response?.data);
            } else {
                console.log('Unknown error');
            }
        }
    };

    const loadName = async () => {
        try {
            const response = await axios.get(URL_USER + userId + '/name');
            setName(response.data.name);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log(error.response?.data);
            } else {
                console.log('Unknown error');
            }
        }
    };

    const genContactInfo = (contact: Contact) => {
        const { _id, userId, ...contactPatch } = contact;
        setContactInfo(contactPatch);
    };

    return (
        <Grid
            container
            direction={'column'}
            marginTop={2}
            rowGap={2}
            sx={{
                backgroundColor: 'lightgray',
                padding: '8px',
                borderRadius: '20px',
                paddingBottom: '20px',
            }}
        >
            <Typography variant="h4" textAlign={'center'}>
                {name}
            </Typography>
            {contactList}
        </Grid>
    );
};

export default Visit;
