import { useContext } from "react";
import { ShoppingCartContext } from "../../Context";
import { ShoppingBagIcon } from "@heroicons/react/24/solid";

const ShoppingCart = () => {

    const context = useContext(ShoppingCartContext);

    const openCheckoutSideMenu = () => {
        // abrir el check y cerrar el detalle del producto
        context.openCheckoutSideMenu();
        context.closeProductDetail();
    }

    return(
        <div 
            className=' relative flex gap-0.5 items-center' 
            onClick={ () => openCheckoutSideMenu()}
        >
            <ShoppingBagIcon className="h-6 w-6 text-black fill-none stroke-black cursor-pointer" /> 
            <div className='absolute buttom-3.5 left-3.5 flex justify-center items-center rounded-full bg-green-700 w-4 h-4 text-xs text-white'>
                {context.cartProducts.length}
            </div>
        </div>
    )
}

export default ShoppingCart;
