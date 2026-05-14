import type React from "react";
import type { RepoResponse } from "./Types";
import { createContext, useContext } from "react";

interface ContextProviderProps {
    pinned: RepoResponse[];
    setPinned: React.Dispatch<React.SetStateAction<RepoResponse[]>>;
}

export const ContextProvider = createContext<ContextProviderProps | undefined>(undefined);

export const useContextProvider = () => {
    const context = useContext(ContextProvider);

    if(!context) {
        throw new Error("useContextProvider error")
    }

    return context;
}