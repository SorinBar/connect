import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { SessionData } from '../models/sessionModel';
import { getSession } from '../utils/sessionCookies';

const USER_URL = 'http://localhost:3000/user/';

const Account = () => {
    const navigate = useNavigate();

    useEffect(() => {
        load();
    }, []);

    const load = async () => {
        const session: SessionData | undefined = getSession();
        console.log(session);
    };

    return <div></div>;
};

export default Account;
