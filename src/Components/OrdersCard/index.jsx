
const OrdersCard = ( { totalPrice, totalProducts } ) => {

    return(
        <div className='flex justify-between items-center mb-3 max-w-sm rounded overflow-hidden shadow-md p-1 border border-black'>
            <p>
                <span>{ new Date().toLocaleDateString()}</span>
                <span>{totalProducts}</span>
                <span>{totalPrice}</span>
            </p>
        </div>
    )
}

export default OrdersCard;