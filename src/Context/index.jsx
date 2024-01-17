import { createContext } from "react";

// se crea un nuevo contexto
const ShoppingCartContext = createContext();

export const ShoppingCartProvider = ( { children } ) => {
    return (
        <ShoppingCartContext.Provider>
            {children}
        </ShoppingCartContext.Provider>
    )
}