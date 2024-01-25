import { useContext, useRef, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import Layout from "../../Components/Layout";
import { ShoppingCartContext } from '../../Context';

function Signin() {

    const context = useContext(ShoppingCartContext);
    // crear el estado local para verificar que vista mostrar
    const [view, setView] = useState('user-info');
    const form = useRef(null);

    // leer la informacion de la cuenta
    const account = localStorage.getItem('account');
    const parsedAccount = JSON.parse(account);

    // verificar si hay cuenta
    const noAccountLS = parsedAccount ? Object.keys(parsedAccount).length === 0 : true;
    const noAccountState = context.account ? Object.keys(context.account).length === 0 : true;
    const hasUserAccount = !noAccountLS || !noAccountState;

    const handleSignIn = () => {
        // indicar que no esta fuera de la sesion
        const stringSignOut = JSON.stringify(false);
        localStorage.setItem('sign-out', stringSignOut);
        context.setSignOut(false);
        // redireccionar
        return <Navigate replace to={'/'} />
    }

    const createAccount = () => {
        const formData = new FormData(form.current);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            password: formData.get('password')
        }
        // crea la cuenta del usuario
        const stringAccount = JSON.stringify(data);
        localStorage.setItem('account', stringAccount);
        context.setAccount(data);
        handleSignIn();
    }

    const renderLogin = () => {
        return (
            <div className='flex flex-col w-80'>
                <p className='justify-between flex'>
                    <span className='font-bold text-sm'>Email: </span>
                    <span>{parsedAccount?.email}</span>
                </p>
                <p className='mt-2 justify-between flex'>
                    <span className='font-bold text-sm'>Name: </span>
                    <span>{parsedAccount?.name}</span>
                </p>
                <Link to='/'>
                    <button 
                        className='bg-green-700 text-white w-full rounded-lg py-3 mt-6 mb-6 disabled:bg-green-700/40'
                        disabled={!hasUserAccount}
                        onClick={ () => handleSignIn() }
                        >
                        Log in
                    </button>
                </Link>
                <div className='text-center'>
                    <a  href='/' className=' font-light text-xs underline underline-offset-4'>Forgot my password</a>
                </div>
                <button 
                    className='border border-black disabled:text-green-700/40 disabled:border-black/40 rounded-lg mt-8 py-3'
                    disabled={hasUserAccount}
                    onClick={ () => setView('create-user-info')}
                >
                    Sign up
                </button>
            </div>
        )
    }

    const renderCreateUser = () => {
        return (
            <form ref={form} className='flex flex-col gap-4 w-80'>
                <div className='flex flex-col gap-1'>
                    <label htmlFor='name' className='font-medium text-sm'>Name</label>
                    <input type='text' id='name' name='name'
                        defaultValue={parsedAccount?.name}
                        placeholder='Name'
                        className='rounded-lg border border-black placeholder:font-light placeholder:text-sm placeholder:text-green-700/60 focus:outline-none py-2 px-2'
                    />
                </div>
                <div className='flex flex-col gap-1'>
                    <label htmlFor='email' className='font-light text-sm'>Email</label>
                    <input 
                        type='text' 
                        id='email'
                        name='email'
                        defaultValue={parsedAccount?.email}
                        placeholder='email@example.com'
                        className='rounded-lg border border-black placeholder:font-light placeholder:text-sm placeholder:text-green-700/60 focus:outline-none py-2 px-2'
                    />
                </div>
                <div className='flex flex-col gap-1'>
                    <label htmlFor='password' className='font-light text-sm'>Password</label>
                    <input 
                        type='password' 
                        id='password'
                        name='password'
                        defaultValue={parsedAccount?.email}
                        placeholder='*****'
                        className='rounded-lg border border-black placeholder:font-light placeholder:text-sm placeholder:text-green-700/60 focus:outline-none py-2 px-2'
                    />
                </div>
                <Link to='/'>
                    <button className='bg-green-700 text-white w-full rounded-lg py-3'
                        onClick={() => createAccount()}
                    >
                        Create
                    </button>
                </Link>
            </form>
        )
    }

    // evaluar si se muestra el login o la creacion del usuario de acuerdo al valor de view
    const renderView = () => view === 'create-user-info' ? renderCreateUser() : renderLogin();

    return (
        <Layout>
            <h1 className='font-bold text-xl mb-6 w-80 text-center text-green-700'> Welcome to Shopi</h1>
            {renderView()}
        </Layout>
    );
}
  
export default Signin;