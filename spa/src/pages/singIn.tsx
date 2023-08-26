import { useAuthContext } from '../contexts/authContext';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { SignInData } from '../models/authModel';
import { signInSchema } from '../schemas/authSchema';
import '../styles/auth.css';
import { Link } from 'react-router-dom';
import CenterContent from '../components/centerContent';

const SingIn = () => {
    const authContext = useAuthContext();

    const formik = useFormik({
        initialValues: { email: '', password: '' } as SignInData,
        onSubmit: (values: SignInData) => {
            alert(values.email + ' | ' + values.password);
        },
        validationSchema: signInSchema,
    });

    return (
        <CenterContent>
            <div className="auth-form">
                <Grid container width={350} direction={'column'}>
                    <Grid item>
                        <form onSubmit={formik.handleSubmit}>
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
                            <Button
                                color="primary"
                                variant="contained"
                                fullWidth
                                type="submit"
                                className="auth-button"
                                disabled={!(formik.isValid && formik.dirty)}
                            >
                                Sign in
                            </Button>
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
                                Don't have an account?
                            </Typography>
                        </Grid>
                        <Grid>
                            <Link to="/sign-up">
                                <Typography color={'blue'} fontSize={14}>
                                    Sign Up
                                </Typography>
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </CenterContent>
    );
};

export default SingIn;
