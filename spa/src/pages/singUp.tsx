import axios from 'axios';
import {
    Alert,
    Button,
    Grid,
    Snackbar,
    TextField,
    Typography,
} from '@mui/material';
import { useState } from 'react';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { signUpSchema } from '../schemas/authSchema';
import { SignUpData } from '../models/authModel';
import CenterContent from '../components/centerContent';
import { NewUser } from '../models/userModel';
import '../styles/auth.css';

const URL = 'http://localhost:3000/auth/sign-up';

const SingUp = () => {
    const navigate = useNavigate();
    const [openSnack, setOpenSnack] = useState(false);
    const [severitySnack, setSeveritySnack] = useState<
        'success' | 'error' | undefined
    >(undefined);
    const [messageSnack, setMessageSnack] = useState<string | undefined>(
        undefined
    );

    const onCloseSnack = () => {
        setOpenSnack(false);
        if (severitySnack === 'success') {
            navigate('/auth/sign-in');
        }
    };

    const formik = useFormik({
        initialValues: { name: '', email: '', password: '' } as SignUpData,
        onSubmit: (values: SignUpData) => {
            const newUser: NewUser = values as NewUser;
            createAccount(newUser);
        },
        validationSchema: signUpSchema,
    });

    const createAccount = async (newUser: NewUser) => {
        try {
            const response = await axios.post(URL, newUser);
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
    };

    return (
        <CenterContent>
            <div className="auth-form">
                <Grid container direction={'column'}>
                    <Grid item>
                        <form onSubmit={formik.handleSubmit}>
                            <TextField
                                fullWidth
                                id="name"
                                name="name"
                                label="Name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={
                                    formik.touched.name &&
                                    Boolean(formik.errors.name)
                                }
                                helperText={
                                    formik.touched.name && formik.errors.name
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
                                id="password"
                                name="password"
                                label="Password"
                                type="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={
                                    formik.touched.password &&
                                    Boolean(formik.errors.password)
                                }
                                helperText={
                                    formik.touched.password &&
                                    formik.errors.password
                                }
                                margin="dense"
                            />
                            <Grid item marginTop={'8px'}>
                                <Button
                                    color="primary"
                                    variant="contained"
                                    fullWidth
                                    type="submit"
                                    className="auth-button"
                                    disabled={!(formik.isValid && formik.dirty)}
                                >
                                    Create account
                                </Button>
                            </Grid>
                        </form>
                    </Grid>

                    <Grid
                        item
                        container
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        margin="4px"
                        marginTop="8px"
                    >
                        <Grid item>
                            <Typography color="rgb(30, 30, 30)" fontSize={14}>
                                Already have an account?
                            </Typography>
                        </Grid>
                        <Grid>
                            <Link to="/auth/sign-in">
                                <Typography color={'blue'} fontSize={14}>
                                    Sign In
                                </Typography>
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
            <Snackbar
                open={openSnack}
                autoHideDuration={4000}
                onClose={onCloseSnack}
            >
                <Alert severity={severitySnack} onClose={onCloseSnack}>
                    {messageSnack}
                </Alert>
            </Snackbar>
        </CenterContent>
    );
};

export default SingUp;
