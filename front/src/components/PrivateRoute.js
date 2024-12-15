// src/components/PrivateRoute.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

function PrivateRoute({ page }) {
    const { username } = useContext(UserContext);


    // this route is to avoid unauthorized access to the dashboard
    if (!username) {
        return <Navigate to="/login" replace />;
    }

    return page;
}

export default PrivateRoute;