import React, { useContext } from 'react';
import { AuthContext } from '../../Context/AuthProvider';
import useBuyer from '../../hooks/useBuyer';
import { Navigate, useLocation } from 'react-router-dom';
import Loader from '../../Pages/Shared/Loader/Loader';

const BuyerRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [isBuyer, isBuyerLoading] = useBuyer(user?.email);
    const location = useLocation();

    if (loading || isBuyerLoading) {
        return <Loader></Loader>
    }

    if (user && isBuyer) {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default BuyerRoute;