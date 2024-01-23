import { useContext } from "react";
import { CheckIcon, PlusIcon, XCircleIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { ShoppingCartContext } from "../../Context";
import { validarURL } from "../../Utils";

const Card = ( { data } ) => {

    const context = useContext(ShoppingCartContext);

    const showProduct = (productDetail) => {
        context.openProductDetail();
        // enviar al contexto el objeto del producto
        context.setProductToShow(productDetail);
        context.closeCheckoutSideMenu();
    }

    const addProductsToCart = ( event, productData ) => {
        // funciona solo cuando se da clic en el +
        event.stopPropagation();
        context.setCount(context.count + 1);
        // tomar los datos que ya estaban y agregar un nuevo elemento
        context.setCartProducts([...context.cartProducts, productData]);
        // abrir el carrito
        context.openCheckoutSideMenu();
        // cerrar el detalle del producto en caso de que este abierto
        context.closeProductDetail();
    }

    // eliminar del carrito un producto
    const handleDelete = id => {
        // regresar la lista menos el que coincida con el id
        const filteredProducts = context.cartProducts.filter(product => product.id != id);
        context.setCartProducts(filteredProducts);
        //restar del contador general
        context.setCount(context.count - 1);
    }

    // si existe en carrito, se muestra en check, sino, + para agregar
    const renderIcon = ( id ) => {
        const isInCart = context.cartProducts.filter(product => product.id === id).length > 0;
        if(isInCart){
            return (
                <>
                    <div 
                        className='absolute top-0 right-0 flex justify-center items-center w-6 h-6 rounded-full m-2 p-1 bg-green-500'>
                        <CheckIcon className="h-6 w-6 text-white" />
                    </div>
                    <div 
                        className='absolute top-0 left-0 flex justify-center items-center w-6 h-6 rounded-full m-2 p-1 bg-red-500'>
                        <XMarkIcon onClick={ () => handleDelete(id) } className="h-6 w-6 text-white" />
                    </div>
                </>
            )
        }
        return (
            <div 
                className='absolute top-0 right-0 flex justify-center items-center bg-white w-6 h-6 rounded-full m-2 p-1'
                onClick={(event) =>addProductsToCart(event, data) } >
                <PlusIcon className="h-6 w-6 text-black" />
            </div>
        )
    }

    return (
        <div 
            className='bg-white cursor-pointer w-56 h-60 rounded-lg'
            onClick={ () => showProduct(data) }>
            <figure className='relative mb-2 w-full h-4/5'>
                <span className='absolute bottom-0 left-0 bg-white/60 rounded-lg text-black text-xs m-2 px-3 py-0.5'>{data.category.name}</span>
                <img className='w-full h-full object-cover rounded-lg' src={validarURL(data.images[0])} alt={data.title} />
                { renderIcon(data.id) }
            </figure>
            <p className='flex justify-between'>
                <span className='text-sm font-light'>{data.title}</span>
                <span className='text-lg font-bold'>${data.price}</span>
            </p>
        </div>
    )
}

export default Card;