import { useContext } from "react";
import { XMarkIcon } from '@heroicons/react/24/solid';
import { ShoppingCartContext } from "../../Context";
import './styles.css';
import { validarURL } from "../../Utils";

const ProductDetail = () => {
    
    const context = useContext(ShoppingCartContext);

    return (
        <aside className={`${context.isProductDetailOpen ? 'flex' : 'hidden'} product-detail flex-col fixed right-0 border border-black rounded bg-white`}>
            <div className='flex justify-between items-center p-6'>
                <h2 className='font-bold text-xl'>Detail</h2>
                <XMarkIcon className="h-6 w-6 text-black cursor-pointer" onClick={() => context.closeProductDetail()} />
            </div>
            <figure className='px-6'>
                <img  
                    className='w-full h-full rounded-lg'
                    src={context.productToShow.images ? validarURL(context.productToShow.images[0]) : ''} 
                    alt={context.productToShow.title} />
            </figure>
            <p className='flex flex-col p-6'>
                <span className='font-bold text-2xl mb-2'>${context.productToShow.price}</span>
                <span className='font-medium text-md mb-2'>{context.productToShow.title}</span>
                <span className='font-light text-sm text-justify'>{context.productToShow.description}</span>
            </p>
        </aside>
    )
}

export default ProductDetail;