import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Header from '../Pages/Shared/Header/Header';
import { AuthContext } from '../Context/AuthProvider';
import useAdmin from '../hooks/useAdmin';
import useBuyer from '../hooks/useBuyer';
import useSeller from '../hooks/useSeller';

const DashboardLayout = () => {

    const { user } = useContext(AuthContext);
    const [isAdmin] = useAdmin(user?.email);
    const [isBuyer] = useBuyer(user?.email);
    const [isSeller] = useSeller(user?.email);

    return (
        <div >
            <Header></Header>
            <div className="drawer drawer-mobile ">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content pt-10">
                    <Outlet></Outlet>
                </div>
                <div className="drawer-side lg:ml-28 lg:px-10 lg:bg-[#fb6230] lg:mx-10 pt-10">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay "></label>
                    <ul className="menu px-4  text-base-content text-lg font-semibold">
                        {
                            isBuyer && <>
                            <li className='btn bg-white my-2 text-[#fb6230] border-[#fb6230] border'><Link to="/dashboard/mybookings">My Orders</Link></li>
                            </>
                        }

                        {
                            isAdmin && <>
                                <li className='btn bg-white my-2 text-[#fb6230] border-[#fb6230] border'><Link to="/dashboard/allusers">All Users</Link></li>
                            </>
                        }

                        {
                            isSeller && <>
                            <li className='btn bg-white my-2 text-[#fb6230] border-[#fb6230] border'><Link to="/dashboard/addproduct">Add Product</Link></li>
                            <li className='btn bg-white my-2 text-[#fb6230] border-[#fb6230] border'><Link to="/dashboard/myproducts">My Products</Link></li>
                            </>
                        }
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;