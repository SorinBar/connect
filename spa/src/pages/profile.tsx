import { useEffect } from 'react';
import { useAuthContext } from '../contexts/authContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const USER_URL = 'http://localhost:3000/user/';

const Profile = () => {
    const authContext = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        load();
    }, []);

    const load = async () => {};

    return (
        <div>
            <div>{authContext.id}</div>
            <br />
            <div>{authContext.token}</div>
        </div>
    );
};

export default Profile;
