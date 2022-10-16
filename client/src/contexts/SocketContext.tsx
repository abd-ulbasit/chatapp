import React, { createContext, Dispatch, FC, ReactNode, SetStateAction, useState } from "react";
type SocketContextType = {
    isFirst: boolean | null,
    setIsFirst: Dispatch<SetStateAction<boolean | null>>
}
const initialValues = {
    isFirst: null,
    setIsFirst: () => { }
}
export const SocketContext = createContext<SocketContextType>(initialValues);



export const SocketContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [isFirst, setIsFirst] = useState<boolean | null>(true);
    const socketContextValue = {
        isFirst,
        setIsFirst
    }
    return <SocketContext.Provider value={socketContextValue}>
        {children}
    </SocketContext.Provider>
}