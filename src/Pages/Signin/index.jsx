import { Link } from 'react-router-dom';
import Layout from "../../Components/Layout";

function Signin() {
    return (
        <Layout>
            <h1 className='font-bold text-xl mb-6 w-80 text-center text-green-700'> Welcome</h1>
            <div className='flex flex-col w-80'>
                <p>
                    <span className='font-light text-sm'>Email: </span>
                    <span>correo@ejemplo.com</span>
                </p>
                <p className='mt-2'>
                    <span className='font-light text-sm'>Password: </span>
                    <span>***</span>
                </p>
                <Link to='/'>
                    <button 
                        className='bg-green-700 text-white w-full rounded-lg py-3 mt-6 mb-6 disabled:bg-green-700/40'>
                        Log in
                    </button>
                </Link>
                <div className='text-center'>
                    <a  href='/' className=' font-light text-xs underline underline-offset-4'>Forgot my password</a>
                </div>
                <button className='border border-black disabled:text-green-700/40 disabled:border-black/40 rounded-lg mt-8 py-3'>
                    Sign up
                </button>
            </div>
        </Layout>
    );
}
  
export default Signin;