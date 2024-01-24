import { useContext } from 'react';
import { ShoppingBagIcon } from '@heroicons/react/24/solid';
import { ShoppingCartContext } from '../../Context';
import { NavLink } from 'react-router-dom';

export const Navbar = () => {
    const context = useContext(ShoppingCartContext);
    const activeStyle = 'underline underline-offset-4';

    // Obtener la informacion para signOut
    const signOut = localStorage.getItem('sign-out');
    const parsedSignOut = JSON.parse(signOut);
    const isSignOut = context.signOut || parsedSignOut;

    const handleSignOut = () => {
        const stringSignOut = JSON.stringify(true);
        // almacenar el valor en LS
        localStorage.setItem('sign-out', stringSignOut);
        context.setSignOut(true);
    }

    const renderView = () => {
        // en caso de que no exista la sesion
        if(isSignOut){
            return (
                <li>
                    <NavLink
                        to='/sign-in'
                        className={({isActive}) => isActive ? activeStyle : undefined }
                        onClick={() => handleSignOut()}
                    >
                        Sign In
                    </NavLink>
                </li>
            )
        }else{
            // si existe sesion, mostrar el menu completo
            return (
                    <>
                    <li className='text-black/60'>
                        correo@ejemplo.com
                    </li>
                    <li>
                        <NavLink to='/my-orders'
                            className={({isActive}) => isActive ? activeStyle : undefined }
                            >
                            My Orders
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/my-account'
                            className={({isActive}) => isActive ? activeStyle : undefined }
                            >
                            My Account
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/sign-in'
                            className={({isActive}) => isActive ? activeStyle : undefined }
                            onClick={ () => handleSignOut()}
                            >
                            Sign Out
                        </NavLink>
                    </li>
                    <li className='flex items-center' onClick={ () => context.openCheckoutSideMenu() }>
                        <ShoppingBagIcon className="h-6 w-6 text-black" /> 
                        <div>
                            {context.cartProducts.length}
                        </div>
                    </li>
                </>
            )
        }
    }

    return (
        <nav className='flex justify-between items-center fixed z-10 top-0 w-full py-5 px-8 text-sm font-light bg-white'>
            <ul className='flex items-center gap-3'>
                <li className='font-semibold text-lg'>
                    <NavLink to='/' onClick={() => context.setSearchByCategory()}>
                        Shopi
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/'
                        className={({isActive}) => isActive ? activeStyle : undefined }
                        onClick={() => context.setSearchByCategory()}
                        >
                        All
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/clothes'
                        className={({isActive}) => isActive ? activeStyle : undefined }
                        onClick={() => context.setSearchByCategory('clothes')}
                        >
                        Clothes
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/electronics'
                        className={({isActive}) => isActive ? activeStyle : undefined }
                        onClick={() => context.setSearchByCategory('electronics')}
                        >
                        Electronics
                    </NavLink>
                </li>
                <li>
                    <NavLink to='fornitures'
                        className={({isActive}) => isActive ? activeStyle : undefined }
                        onClick={() => context.setSearchByCategory('fornitures')}
                        >
                        Fornitures
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/toys'
                        className={({isActive}) => isActive ? activeStyle : undefined }
                        onClick={() => context.setSearchByCategory('toys')}
                        >
                        Toys
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/others'
                        className={({isActive}) => isActive ? activeStyle : undefined }
                        onClick={() => context.setSearchByCategory('others')}
                        >
                        Others
                    </NavLink>
                </li>
            </ul>
            <ul className='flex items-center gap-3'>
                { renderView() }
            </ul>
        </nav>
    )
}
