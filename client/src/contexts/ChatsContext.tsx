import React, { createContext, Dispatch, FC, ReactNode, SetStateAction, useState } from "react";
import { ChatType } from "../Models/Models";
type ChatContextType = {
    chats: ChatType[] | null,
    setChats: Dispatch<SetStateAction<ChatType[] | null>>
}
const initialValues = {
    chats: [],
    setChats: () => { }
}
export const ChatContext = createContext<ChatContextType>(initialValues);



export const ChatContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [chats, setChats] = useState<ChatType[] | null>([]);
    const chatContextValues = {
        chats,
        setChats
    }
    return <ChatContext.Provider value={chatContextValues}>
        {children}
    </ChatContext.Provider>
}

// import { createContext, FC, ReactNode, SetStateAction, useState } from "react";
// import { Dispatch } from "react";
// type AuthContextType = {
//     userName: string | null,
//     setUserName: Dispatch<SetStateAction<string | null>>
// }
// export const AuthContext = createContext<AuthContextType>({
//     userName: "",
//     setUserName: () => { },
// });
// export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {

//     const [userName, setUserName] = useState<string | null>(localStorage.getItem("username"));
//     const initialValue = { userName, setUserName }
//     return (
//         <AuthContext.Provider value={initialValue}>
//             {children}
//         </AuthContext.Provider>
//     )
// }