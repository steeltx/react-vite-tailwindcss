import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from "../../Components/Layout";
import { ShoppingCartContext } from '../../Context';

function Signin() {

    const context = useContext(ShoppingCartContext);
    // crear el estado local para verificar que vista mostrar
    const [view, setView] = useState('user-info');

    // leer la informacion de la cuenta
    const account = localStorage.getItem('account');
    const parsedAccount = JSON.parse(account);

    // verificar si hay cuenta
    const noAccountLS = parsedAccount ? Object.keys(parsedAccount).length === 0 : true;
    const noAccountState = context.account ? Object.keys(context.account).length === 0 : true;
    const hasUserAccount = !noAccountLS || !noAccountState;

    const renderLogin = () => {
        return (
            <div className='flex flex-col w-80'>
                <p>
                    <span className='font-light text-sm'>Email: </span>
                    <span>{parsedAccount?.email}</span>
                </p>
                <p className='mt-2'>
                    <span className='font-light text-sm'>Password: </span>
                    <span>{parsedAccount?.password}</span>
                </p>
                <Link to='/'>
                    <button 
                        className='bg-green-700 text-white w-full rounded-lg py-3 mt-6 mb-6 disabled:bg-green-700/40'
                        disabled={!hasUserAccount}
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

    }

    // evaluar si se muestra el login o la creacion del usuario de acuerdo al valor de view
    const renderView = () => view === 'create-user-info' ? renderCreateUser() : renderLogin();

    return (
        <Layout>
            <h1 className='font-bold text-xl mb-6 w-80 text-center text-green-700'> Welcome</h1>
            {renderView()}
        </Layout>
    );
}
  
export default Signin;