import { createContext, useState, useEffect } from "react";

// se crea un nuevo contexto
export const ShoppingCartContext = createContext();

export const inicializarLocalStorage = () => {

    // obtener los valores que se encuentran almacenados en local storage
    const accountLS = localStorage.getItem('account');
    const signOutLS = localStorage.getItem('sign-out');

    let parsedAccount;
    let parsedSignOut;

    // si no existe informacion de la cuenta en LS, setear vacio
    if(!accountLS){
        localStorage.setItem('account', JSON.stringify({}));
        parsedAccount = {};
    } 
    // si hay datos, traerlos y parsearlos con JSON
    else {
        parsedAccount = JSON.parse(accountLS);
    }

    // si no inicio sesion, establecer como falso
    if(!signOutLS){
        localStorage.setItem('sign-out', JSON.stringify(false));
        parsedSignOut = {};
    }
    // si hay datos, traerlos y parsearlos con JSON
    else {
        parsedSignOut = JSON.parse(signOutLS);
    }
}

export const ShoppingCartProvider = ( { children } ) => {

    // Cuenta
    const [account, setAccount] = useState({});
    
    // Sesion
    const [signOut, setSignOut] = useState(false);

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
    // obtener productos por categoria
    const [ searchByCategory, setSearchByCategory ] = useState(null);

    // llamado de API
    useEffect(() => {
        fetch('https://api.escuelajs.co/api/v1/products')
            .then(response  => response.json())
            .then(data => setItems(data))
    },[]);

    const filteredItemsByTitle = (items, searchByTitle) => {
        return items?.filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()))
    }

    const filteredItemsByCategory = (items, searchByCategory) => {
        return items?.filter(item => item.category.name.toLowerCase().includes(searchByCategory.toLowerCase()))
    }

    const filterBy = (searchType, items, searchByTitle, searchByCategory) => {
        if(searchType === 'BY_TITLE'){
            return filteredItemsByTitle(items,searchByTitle);
        }
        if(searchType === 'BY_CATEGORY'){
            return filteredItemsByCategory(items,searchByCategory);
        }
        if(searchType === 'BY_TITLE_AND_CATEGORY'){
            return filteredItemsByCategory(items,searchByCategory).filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()));
        }
        if(!searchType){
            return items;
        }
    }

    useEffect(() => {
        // si se realiza una busqueda, establecer los elementos filtrados
        if(searchByTitle && searchByCategory) setFilteredItems(filterBy('BY_TITLE_AND_CATEGORY',items, searchByTitle, searchByCategory));
        if(searchByTitle && !searchByCategory) setFilteredItems(filterBy('BY_TITLE',items, searchByTitle, searchByCategory));
        if(!searchByTitle && searchByCategory) setFilteredItems(filterBy('BY_CATEGORY',items, searchByTitle, searchByCategory));
        if(!searchByTitle && !searchByCategory) setFilteredItems(filterBy(null,items, searchByTitle, searchByCategory));
    },[items, searchByTitle, searchByCategory]);

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
            filteredItems,
            searchByCategory,
            setSearchByCategory,
            account,
            setAccount,
            signOut,
            setSignOut
        }}>
            {children}
        </ShoppingCartContext.Provider>
    )
}