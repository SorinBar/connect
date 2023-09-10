import { Avatar, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { SessionData } from '../models/sessionModel';
import { getSession } from '../utils/sessionCookies';
import axios from 'axios';

const URL = 'http://localhost:3000/user/';

const AccountProfile = () => {
    const [name, setName] = useState('');

    useEffect(() => {
        load();
    }, []);

    const load = async () => {
        const session: SessionData | undefined = getSession();
        if (session) {
            try {
                const response = await axios.get(
                    URL + session.userId + '/name'
                );
                setName(response.data.name);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.log(error.response?.data);
                } else {
                    console.log('Unknown error');
                }
            }
        }
    };

    return (
        <Grid container direction={'column'} alignItems={'center'}>
            <Grid item margin={3}>
                <Avatar sx={{ width: '100px', height: '100px' }} />
            </Grid>
            <Grid item>
                <Typography variant="h5">{name}</Typography>
            </Grid>
        </Grid>
    );
};

export default AccountProfile;
