import { createContext, useState } from "react";

// se crea un nuevo contexto
export const ShoppingCartContext = createContext();

export const ShoppingCartProvider = ( { children } ) => {

    // se crea el estado que toda la app puede usar
    const [count, setCount] = useState(0);

    return (
        <ShoppingCartContext.Provider value={{
            count,
            setCount
        }}>
            {children}
        </ShoppingCartContext.Provider>
    )
}