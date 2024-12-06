import { Navigate, useLocation } from 'react-router-dom';
import auth from '../helpers/auth.helper';

const PrivateRouter = ({ children, ...rest }) => {
    const location = useLocation();

    return auth.isAuthenticated() ? (children) : (
        <Navigate
            to="/signin"
            state={{ from: location }}
            replace
        />
    )
}

export default PrivateRouter