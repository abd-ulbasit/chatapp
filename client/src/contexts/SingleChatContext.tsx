import React, { createContext, Dispatch, FC, ReactNode, SetStateAction, useState } from "react";
import { ChatType } from "../Models/Models";
type SingleChatContextType = {
    singleChat: ChatType | null,
    setSingleChat: Dispatch<SetStateAction<ChatType | null>>
}
const initialValues = {
    singleChat: null,
    setSingleChat: () => { }
}
export const SingleChatContext = createContext<SingleChatContextType>(initialValues);



export const SingleChatContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [singleChat, setSingleChat] = useState<ChatType | null>(null);
    const chatContextValues = {
        singleChat,
        setSingleChat
    }
    return <SingleChatContext.Provider value={chatContextValues}>
        {children}
    </SingleChatContext.Provider>
}