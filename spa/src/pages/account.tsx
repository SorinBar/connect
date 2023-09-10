import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SessionData } from '../models/sessionModel';
import { getSession } from '../utils/sessionCookies';
import { Box, Drawer, List, ListItemButton } from '@mui/material';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountLogout from '../components/accountLogout';
import AccountProfile from '../components/accountProfile';
import AccountQRCode from '../components/accountUserQR';
import AccountEditContact from '../components/accountEditContact';

const Account = () => {
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState<boolean[]>([true, false, false]);
    const [logoutOpen, setLogoutOpen] = useState(false);

    useEffect(() => {
        load();
    }, []);

    const load = async () => {
        const session: SessionData | undefined = getSession();
        if (!session) {
            navigate('/auth/sign-in');
        }
    };

    const activateTab = (index: number) => {
        const n = 3;
        if (index >= n) {
            return () => {};
        }
        return () => {
            const tabs: boolean[] = Array.from({ length: n }, () => false);
            tabs[index] = true;
            setActiveTab(tabs);
        };
    };

    return (
        <Box>
            <Drawer anchor="left" variant="permanent">
                <List>
                    <ListItemButton onClick={activateTab(0)}>
                        <AccountCircleIcon />
                    </ListItemButton>
                    <ListItemButton onClick={activateTab(1)}>
                        <QrCode2Icon />
                    </ListItemButton>
                    <ListItemButton onClick={activateTab(2)}>
                        <EditIcon />
                    </ListItemButton>
                    <ListItemButton
                        onClick={() => {
                            setLogoutOpen(true);
                        }}
                    >
                        <LogoutIcon />
                    </ListItemButton>
                </List>
            </Drawer>
            <Box sx={{ paddingLeft: '57px' }}>
                {activeTab[0] && <AccountProfile />}
                {activeTab[1] && <AccountQRCode />}
                {activeTab[2] && <AccountEditContact />}
            </Box>
            <AccountLogout open={logoutOpen} setOpen={setLogoutOpen} />
        </Box>
    );
};

export default Account;
