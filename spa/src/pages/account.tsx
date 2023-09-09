import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { SessionData } from '../models/sessionModel';
import { getSession } from '../utils/sessionCookies';
import { Box, Drawer, Grid, List, ListItemButton } from '@mui/material';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import QRCode from 'qrcode.react';
import LogoutConfirmation from '../components/logoutConfirmation';

const USER_URL = 'http://localhost:3000/user/';

const Account = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<boolean[]>([true, false, false]);
    const [qrUrl, setQrUrl] = useState<string | undefined>(undefined);
    const [logoutOpen, setLogoutOpen] = useState(false);
    useEffect(() => {
        load();
    }, []);

    const load = async () => {
        const session: SessionData | undefined = getSession();
        console.log(session);
        if (session) {
            setQrUrl('www.test.com/' + session.userId);
        } else {
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
                {activeTab[0] && (
                    <Grid container direction="column" padding={3} rowGap={10}>
                        <Grid item>
                            <div>
                                Lorem, ipsum dolor sit amet consectetur
                                adipisicing elit. Inventore cupiditate, corporis
                                non tempora veritatis ea iure quibusdam odio
                                tempore, voluptatibus necessitatibus. Eligendi
                                eum necessitatibus, aliquid voluptates sapiente
                                nulla incidunt iulogoutOpenre.
                            </div>
                        </Grid>
                        <Grid item>
                            <div>
                                Lorem, ipsum dolor sit amet consectetur
                                adipisicing elit. Inventore cupiditate, corporis
                                non tempora veritatis ea iure quibusdam odio
                                tempore, voluptatibus necessitatibus. Eligendi
                                eum necessitatibus, aliquid voluptates sapiente
                                nulla incidunt iure.
                            </div>
                        </Grid>
                    </Grid>
                )}
                {activeTab[1] && (
                    <Box
                        display="flex"
                        alignContent="center"
                        justifyContent="center"
                        marginTop={5}
                    >
                        {qrUrl && <QRCode size={200} value={qrUrl} />}
                    </Box>
                )}
                {activeTab[2] && (
                    <Box
                        display="flex"
                        alignContent="center"
                        justifyContent="center"
                        marginTop={5}
                    >
                        <div>EDIT</div>
                    </Box>
                )}
            </Box>
            <LogoutConfirmation open={logoutOpen} setOpen={setLogoutOpen} />
        </Box>
    );
};

export default Account;
