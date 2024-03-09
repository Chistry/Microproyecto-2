import { createContext, useContext } from "react";

/** @type {React.Context.<import('firebase/auth').User | null>} */

export const UserContext = createContext(null);

export function useUser(){
    const usuario = useContext(UserContext);
    return usuario;
}