import { useContext } from "react";
import { XMarkIcon } from '@heroicons/react/24/solid';
import { ShoppingCartContext } from "../../Context";
import OrderCard from '../OrderCard';
import './styles.css';

const CheckoutSideMenu = () => {
    
    const context = useContext(ShoppingCartContext);

    console.log(context.cartProducts);

    return (
        <aside className={`${context.isCheckoutSideMenuOpen ? 'flex' : 'hidden'} checkout-slide-menu flex-col fixed right-0 border border-black rounded bg-white`}>
            <div className='flex justify-between items-center p-6'>
                <h2 className='font-bold text-xl'>My Order</h2>
                <XMarkIcon className="h-6 w-6 text-black cursor-pointer" onClick={() => context.closeCheckoutSideMenu()} />
            </div>
            <div className='px-6'>
                {
                    context.cartProducts.map(product => (
                        <OrderCard
                            key={product.title}
                            title={product.title}
                            imageURL={product.images}
                            price={product.price}
                        />
                    ))
                }
            </div>
        </aside>
    )
}

export default CheckoutSideMenu;