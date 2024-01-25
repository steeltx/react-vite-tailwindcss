import { useContext } from 'react';
import { useRoutes, BrowserRouter, Navigate } from 'react-router-dom';
import { ShoppingCartContext, ShoppingCartProvider, inicializarLocalStorage } from '../../Context';
import Home from "../Home";
import MyAccount from "../MyAccount";
import MyOrder from "../MyOrder";
import MyOrders from "../MyOrders";
import NotFound from "../NotFound";
import Signin from "../Signin";
import { Navbar } from '../../Components/Navbar';
import CheckoutSideMenu from '../../Components/CheckoutSideMenu';

import "../../App.css";

const AppRoutes = () => {

    // obtener los datos de usuario del storage y de context
    const context = useContext(ShoppingCartContext);
    
    const account = localStorage.getItem('account');
    const parsedAccount = JSON.parse(account);
    
    const signOut = localStorage.getItem('sign-out');
    const parsedSignOut = JSON.parse(signOut);

    const noAccountLS = parsedAccount ? Object.keys(parsedAccount).length === 0 : true;
    const noAccountState = context.account ? Object.keys(context.account).length === 0 : true;
    const hasUserAccount = !noAccountLS || !noAccountState;
    const isSignOut = context.signOut || parsedSignOut;


    // creamos todas las rutas que contiene el sistema y las exportamos en un array
    let routes = useRoutes([
        { path: '/', element: hasUserAccount && !isSignOut ? <Home /> : <Navigate replace to={'/sign-in'} />},
        { path: '/clothes', element: hasUserAccount && !isSignOut ? <Home /> : <Navigate replace to={'/sign-in'} />},
        { path: '/electronics', element: hasUserAccount && !isSignOut ? <Home /> : <Navigate replace to={'/sign-in'} />},
        { path: '/fornitures', element: hasUserAccount && !isSignOut ? <Home /> : <Navigate replace to={'/sign-in'} />},
        { path: '/toys', element: hasUserAccount && !isSignOut ? <Home /> : <Navigate replace to={'/sign-in'} />},
        { path: '/others', element: hasUserAccount && !isSignOut ? <Home /> : <Navigate replace to={'/sign-in'} />},
        { path: '/my-account', element: <MyAccount /> },
        { path: '/my-order', element: <MyOrder /> },
        { path: '/my-orders', element: <MyOrders /> },
        { path: '/my-orders/last', element: <MyOrder /> },
        { path: '/my-orders/:id', element: <MyOrder /> },
        { path: '/sign-in', element: <Signin /> },
        { path: '/*', element: <NotFound /> }
    ]);
    return routes;
}

const App = () => {
    inicializarLocalStorage();
    return (
        <ShoppingCartProvider>
            <BrowserRouter>
                <AppRoutes />
                <Navbar />
                <CheckoutSideMenu />
            </BrowserRouter>
        </ShoppingCartProvider>
    );
}

export default App;