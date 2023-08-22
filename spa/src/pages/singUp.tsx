import { Button, Grid, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { signUpSchema } from '../schemas/authSchema';
import { SignUpData } from '../models/authModel';
import '../styles/auth.css';
import { Link } from 'react-router-dom';

const SingUp = () => {
    const formik = useFormik({
        initialValues: { name: '', email: '', password: '' } as SignUpData,
        onSubmit: (values: SignUpData) => {
            alert(values.name + ' | ' + values.email + ' | ' + values.password);
        },
        validationSchema: signUpSchema,
    });

    return (
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
                        <Link to="/sign-in">
                            <Typography color={'blue'} fontSize={14}>
                                Sign In
                            </Typography>
                        </Link>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
};

export default SingUp;
