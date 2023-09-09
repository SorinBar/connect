import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
} from '@mui/material';
import React, { useState } from 'react';
import { setSession } from '../utils/sessionCookies';

export interface LogoutConfirmationProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const LogoutConfirmation: React.FC<LogoutConfirmationProps> = (props) => {
    const confirmClick = () => {
        props.setOpen(false);
        setSession('', '');
    };

    const cancelClick = () => {
        props.setOpen(false);
    };

    return (
        <Dialog open={props.open}>
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

export default LogoutConfirmation;
