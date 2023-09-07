import { Routes, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import SingIn from '../pages/singIn';
import SingUp from '../pages/singUp';
import Account from '../pages/account';

function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="auth">
                    <Route path="sign-in" Component={SingIn} />
                    <Route path="sign-up" Component={SingUp} />
                </Route>
                <Route path="account" Component={Account} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;
