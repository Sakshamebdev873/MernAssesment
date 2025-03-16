import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Guest,{loader as guestLoader} from './Pages/Guest';
import Login, { action as loginAction } from './Pages/Login'; // Import the action
import AdminDashboard,{loader as AdminLoader} from './Pages/AdminDahboard';
import AddCoupon,{action as Addaction} from './Pages/AddCoupon';
import EditCoupon ,{action as Editaction,loader as editloader } from './Pages/EditCoupon';
import IpAdress,{loader as iploader} from './Pages/IpAdress'
import DeleteCoupon from './Pages/DeleteCoupon';

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <>
                <Navbar />
                <Hero />
            </>
        ),
    },
    {
        path: '/guest',
        element: (
            <>
                <Navbar />
                <Guest />
            </>
        ),
        loader : guestLoader
    },
    {
        path: '/dashboard',
        element: (
            <>
                <Navbar />
                <AdminDashboard />
            </>
        ),
        loader : AdminLoader
    },
    {
        path: '/login',
        element: (
            <>
                <Navbar />
                <Login />
            </>
        ),
        action: loginAction // Connect action for form submission
    },
    {
        path : '/add',
        element : (
            <>
            <Navbar/>
            <AddCoupon/>
            </>
        ),
        action:Addaction
    },
    {
        path : '/edit/:id',
        element : (
            <>
            <Navbar/>
            <EditCoupon/>
            </>
        ),
        action : Editaction,
        loader: editloader
    },
    {
        path:'/delete',
        element: (
            <>
            <Navbar/>
            <DeleteCoupon/>
            </>
        )
    },{
        path :'/ip',
        element : (
            <>
            <Navbar/>
            <IpAdress/>
            </>
        ),
        loader : iploader
    }
]);

const App = () => {
    return <RouterProvider router={router} />;
};

export default App;
