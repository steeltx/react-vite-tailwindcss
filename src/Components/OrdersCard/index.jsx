import { CalendarDaysIcon, ChevronRightIcon, ListBulletIcon } from "@heroicons/react/24/solid";

const OrdersCard = ( { totalPrice, totalProducts } ) => {

    return(
        <div className='flex justify-between items-center mb-4 border border-black rounded-lg w-80 p-4 shadow-md'>
            <div className='flex justify-between w-full'>
                <div className='flex flex-col'> 
                <p className='flex'>
                    <CalendarDaysIcon 
                        className='h-6 w-6 text-black cursor-pointer'>
                    </CalendarDaysIcon>
                    <span className='font-medium px-2'>{ new Date().toLocaleDateString()}</span>
                </p>
                <p className='flex'>
                    <ListBulletIcon 
                        className='h-6 w-6 text-black cursor-pointer'>
                    </ListBulletIcon>
                    <span className='font-medium px-2'>{totalProducts} articulos</span>
                </p>
                </div>
                <div className='flex items-center gap-2'>
                    <span className='font-bold text-2xl text-blue-600'>${totalPrice}</span>
                    <ChevronRightIcon 
                        className='h-6 w-6 text-black cursor-pointer'>
                    </ChevronRightIcon>
                </div>
            </div>
        </div>
    )
}

export default OrdersCard;