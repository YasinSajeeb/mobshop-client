import React, { useContext } from 'react';
import { AuthContext } from '../../../Context/AuthProvider';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    return (
        <div>
            <h1 className='text-3xl font-bold text-center lg:text-left'>Welcome {user?.displayName} to your Dashboard.</h1>
        </div>
    );
};

export default Dashboard;
