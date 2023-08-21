import { useAuth } from '../contexts/authContext';
import { Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { SignInData } from '../models/authModel';
import { signInSchema } from '../schemas/authSchema';
import '../styles/auth.css';

const SingIn = () => {
    const authContext = useAuth();

    const formik = useFormik({
        initialValues: { email: '', password: '' } as SignInData,
        onSubmit: (values: SignInData) => {
            alert(values.email + ' | ' + values.password);
        },
        validationSchema: signInSchema,
    });

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    fullWidth
                    id="email"
                    name="email"
                    label="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
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
                        formik.touched.password && formik.errors.password
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
        </div>
    );
};

export default SingIn;
