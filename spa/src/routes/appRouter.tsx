import { Routes, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import SingIn from '../pages/singIn';
import SingUp from '../pages/singUp';
import Profile from '../pages/profile';

function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="auth">
                    <Route path="sign-in" Component={SingIn} />
                    <Route path="sign-up" Component={SingUp} />
                </Route>
                <Route path="profile" Component={Profile} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;
