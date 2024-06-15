import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main";
import Blogs from "../../Pages/Blogs/Blogs";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login";
import Signup from "../../Pages/Signup/Signup";
import Header from "../../Pages/Shared/Header/Header";
import Footer from "../../Pages/Shared/Footer/Footer";
import Error from "../../Pages/Error/Error";
import HomeCategories from "../../Pages/Home/HomeCategories/HomeCategories";
import MobileDetails from "../../Pages/Mobiles/MobileDetails/MobileDetails";
import Dashboard from "../../Pages/Dashboard/Dashboard/Dashboard";
import DashboardLayout from "../../Layout/DashboardLayout";
import MyBookings from "../../Pages/Dashboard/MyBookings/MyBookings";
import AllUsers from "../../Pages/Dashboard/AllUsers/AllUsers";
import AddProduct from "../../Pages/Dashboard/AddProduct/AddProduct";
import MyProducts from "../../Pages/Dashboard/MyProducts/MyProducts";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/blogs',
                element: <Blogs></Blogs>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <Signup></Signup>
            },
            {
                path: '/mobiles',
                element: <HomeCategories></HomeCategories>
            },
            {
                path: '/mobiles/:id',
                element: <MobileDetails></MobileDetails>,
                loader: ({params}) => fetch(`https://mobshop-server-85ytyuke2-yasinsajeebs-projects.vercel.app/mobiles/${params.id}`)
            }
        ]
    },
    {
        path: "/dashboard",
        element: <DashboardLayout></DashboardLayout>,
        children: [
            {
                path:'/dashboard',
                element: <Dashboard></Dashboard>
            },
            {
                path:'/dashboard/mybookings',
                element: <MyBookings></MyBookings>
            },
            {
                path:'/dashboard/allusers',
                element: <AllUsers></AllUsers>
            },
            {
                path:'/dashboard/addproduct',
                element: <AddProduct></AddProduct>,
                loader: () => fetch(`https://mobshop-server-85ytyuke2-yasinsajeebs-projects.vercel.app/mobiles`)
            },
            {
                path:'/dashboard/myproducts',
                element: <MyProducts></MyProducts>
            },
        ]
    },
    {
        path: '*', element: <div>
            <Header></Header>
            <Error></Error>
            <Footer></Footer>
        </div>
    }
]);