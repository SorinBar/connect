import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
} from '@mui/material';
import React from 'react';

import { clearSession } from '../utils/sessionCookies';
import { useNavigate } from 'react-router-dom';

export interface LogoutConfirmationProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AccountLogout: React.FC<LogoutConfirmationProps> = ({
    open,
    setOpen,
}) => {
    const navigate = useNavigate();

    const confirmClick = () => {
        setOpen(false);
        clearSession();
        navigate('/auth/sign-in');
    };

    const cancelClick = () => {
        setOpen(false);
    };

    return (
        <Dialog open={open}>
            <DialogContent>
                <DialogContentText color="black">
                    Are you sure you want to log out?
                </DialogContentText>
                <DialogActions>
                    <Button sx={{ color: 'black' }} onClick={confirmClick}>
                        Yes
                    </Button>
                    <Button sx={{ color: 'black' }} onClick={cancelClick}>
                        Cancel
                    </Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
};

export default AccountLogout;
