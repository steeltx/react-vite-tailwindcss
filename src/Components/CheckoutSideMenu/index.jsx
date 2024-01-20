import { useContext } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { ShoppingCartContext } from "../../Context";
import OrderCard from '../OrderCard';
import 'react-toastify/dist/ReactToastify.css';
import { totalPrice } from "../../Utils";
import './styles.css';

const CheckoutSideMenu = () => {
    
    const context = useContext(ShoppingCartContext);

    // eliminar del carrito un producto
    const handleDelete = id => {
        // regresar la lista menos el que coincida con el id
        const filteredProducts = context.cartProducts.filter(product => product.id != id);
        context.setCartProducts(filteredProducts);
        // mostrar un mensaje al usuario
        toast.error("Producto eliminado correctamente");
        //restar del contador general
        context.setCount(context.count - 1);
    }

    return (
        <aside className={`${context.isCheckoutSideMenuOpen ? 'flex' : 'hidden'} checkout-slide-menu flex-col fixed right-0 border border-black rounded bg-white`}>
            <div className='flex justify-between items-center p-6'>
                <h2 className='font-bold text-xl'>My Order</h2>
                <XMarkIcon className="h-6 w-6 text-black cursor-pointer" onClick={() => context.closeCheckoutSideMenu()} />
            </div>
            <div className='px-6 overflow-y-scroll'>
                {
                    context.cartProducts.map(product => (
                        <OrderCard
                            key={product.title}
                            id={product.id}
                            title={product.title}
                            imageURL={product.images}
                            price={product.price}
                            handleDelete = {handleDelete}
                        />
                    ))
                }
                <ToastContainer position="bottom-center" autoClose={2500} transition: Zoom stacked/>
            </div>
            <div className='px-6'>
                <p className='flex justify-between items-center'>
                    <span className='font-medium'>Total :</span>
                    <span className='font-bold text-xl'>${ totalPrice(context.cartProducts) }</span>
                </p>
            </div>
        </aside>
    )
}

export default CheckoutSideMenu;