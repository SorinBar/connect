import { useAuth } from '../contexts/authContext';
import { Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { signUpSchema } from '../schemas/authSchema';
import { SignUpData } from '../models/authModel';
import '../styles/auth.css';

const SingUp = () => {
    const authContext = useAuth();

    const formik = useFormik({
        initialValues: { name: '', email: '', password: '' } as SignUpData,
        onSubmit: (values: SignUpData) => {
            alert(values.name + ' | ' + values.email + ' | ' + values.password);
        },
        validationSchema: signUpSchema,
    });

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    fullWidth
                    id="name"
                    name="name"
                    label="Name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
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
                    Create account
                </Button>
            </form>
        </div>
    );
};

export default SingUp;
