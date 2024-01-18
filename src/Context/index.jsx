import { createContext, useState } from "react";

// se crea un nuevo contexto
export const ShoppingCartContext = createContext();

export const ShoppingCartProvider = ( { children } ) => {

    // Carrito - Cantidades
    const [count, setCount] = useState(0);
    
    // detalle de producto - Abrir/Cerrar
    const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
    const openProductDetail = () => setIsProductDetailOpen(true);
    const closeProductDetail = () => setIsProductDetailOpen(false);

    // CheckoutSideMenu Abrir/Cerrar
    const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState(false);
    const openCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(true);
    const closeCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(false);

    // detalle de producto - Mostrar
    const [productToShow, setProductToShow] = useState({});

    // carrito - agregar productos al carrito
    const [cartProducts, setCartProducts] = useState([]);

    return (
        <ShoppingCartContext.Provider value={{
            count,
            setCount,
            openProductDetail,
            closeProductDetail,
            isProductDetailOpen,
            productToShow,
            setProductToShow,
            cartProducts,
            setCartProducts,
            isCheckoutSideMenuOpen,
            openCheckoutSideMenu,
            closeCheckoutSideMenu
        }}>
            {children}
        </ShoppingCartContext.Provider>
    )
}