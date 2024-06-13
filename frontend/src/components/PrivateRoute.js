import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const getAccessToken = () => {
    const cookie = document.cookie.split('; ').find(row => row.startsWith('access_token='));
    return cookie ? cookie.split('=')[1] : null;
};

const PrivateRoute = ({ allowedRoles }) => {
    const access_token = getAccessToken();

    if (access_token) {
        try {
            const decodedToken = jwtDecode(access_token);
            const currentTime = Date.now() / 1000;

            if (decodedToken.exp < currentTime) {
                // Token has expired
                return <Navigate to="/login" />;
            }

            if (allowedRoles.includes(decodedToken.user.role)) {
                // User role is allowed
                return <Outlet />;
            } else {
                // User role is not allowed
                return <Navigate to="/" />;
            }
        } catch (err) {
            // Error decoding token
            return <Navigate to="/login" />;
        }
    }

    // No access token present
    return <Navigate to="/login" />;
};

export default PrivateRoute;
