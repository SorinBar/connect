import { Routes, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Auth from '../pages/auth';

function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/auth" Component={Auth} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;
