import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import QRCode from 'qrcode.react';
import { getSession } from '../utils/sessionCookies';
import { SessionData } from '../models/sessionModel';

const ACCOUNT_URL = 'localhost:5000/visit/';

const AccountQRCode = () => {
    const [url, setUrl] = useState<string | undefined>(undefined);

    useEffect(() => {
        load();
    }, []);

    const load = async () => {
        const session: SessionData | undefined = getSession();
        if (session) {
            setUrl(ACCOUNT_URL + session.userId);
        }
    };
    return (
        <Box
            display="flex"
            alignContent="center"
            justifyContent="center"
            marginTop={5}
        >
            {url && <QRCode size={200} value={url} />}
        </Box>
    );
};

export default AccountQRCode;
