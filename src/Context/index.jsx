import { createContext, useState, useEffect } from "react";

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

    // carrito - orden
    const [ order, setOrder ] = useState([]);

    // obtener productos
    const [items, setItems] = useState(null);
    const [filteredItems, setFilteredItems] = useState(null);

    // obtener productos por titulo
    const [ searchByTitle, setSearchByTitle ] = useState(null);

    // llamado de API
    useEffect(() => {
        fetch('https://api.escuelajs.co/api/v1/products')
            .then(response  => response.json())
            .then(data => setItems(data))
    },[]);

    const filteredItemsByTitle = (items, searchByTitle) => {
        return items?.filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()))
    }

    useEffect(() => {
        // si se realiza una busqueda, establecer los elementos filtrados
        if(searchByTitle) setFilteredItems(filteredItemsByTitle(items,searchByTitle));
    },[items, searchByTitle]);


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
            closeCheckoutSideMenu,
            order,
            setOrder,
            items,
            setItems,
            searchByTitle,
            setSearchByTitle,
            filteredItems
        }}>
            {children}
        </ShoppingCartContext.Provider>
    )
}