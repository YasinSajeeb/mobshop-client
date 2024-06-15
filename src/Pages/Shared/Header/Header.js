import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthProvider';
import { useQuery } from '@tanstack/react-query';

const Header = () => {
    const { user, logOut } = useContext(AuthContext);

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(e => console.error(e))
    }

    const { data: mobiles = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch('https://mobshop-server-85ytyuke2-yasinsajeebs-projects.vercel.app/mobiles');
            const data = await res.json();
            return data;
        }
    });

    const menuItems = <>
        <li className='hover:text-yellow-500'><Link to='/'>Home</Link></li>
        <li className='hover:text-yellow-500'><Link to='/blogs'>Blogs</Link></li>
        <li>{
            user?.uid ?
                <>
                    <Link className='hover:text-yellow-500' to='/dashboard'>Dashboard</Link>
                    <button onClick={handleLogOut} className="btn btn-ghost border-0 rounded-none hover:rounded-none hover:text-yellow-500">LogOut</button>
                </>
                :
                <>
                    <Link className='hover:text-yellow-500' to='/login'>Login</Link>
                    <Link className='hover:text-yellow-500' to='/signup'>Sign Up</Link>
                </>
        }</li>
    </>
    return (
        <div className="navbar mt-0 my-2 lg:px-28 lg:py-4 lg:sticky lg:bg-[#252931] top-0 z-50 mb-0">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={1} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {menuItems}
                    </ul>
                </div>

                <Link to='/' className="normal-case text-xl transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 duration-300 ">
                    <div className='flex items-center'>
                        <div className='mr-5 lg:text-white'><span className='text-4xl font-bold'>Mob<span className='text-yellow-500'>Shop</span></span></div>
                    </div>
                </Link>

            </div>


            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal p-0 text-white">
                    {menuItems}
                </ul>
            </div>
            <div className="navbar-end ">

                <ul className="  menu menu-horizontal p-0 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none mr-3 text-[#fb6230]">
                    <ul >
                        {
                            user?.uid ?
                                <Link className='font-semibold' to='/'>{user?.displayName}</Link>
                                :
                                <></>
                        }
                    </ul>
                </ul>
                
            </div>
        </div>
    );
};

export default Header;