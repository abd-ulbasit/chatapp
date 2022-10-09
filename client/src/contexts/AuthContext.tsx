import { createContext, FC, ReactNode, SetStateAction, useState } from "react";
import { Dispatch } from "react";
type AuthContextType = {
    userName: string | null,
    setUserName: Dispatch<SetStateAction<string | null>>
}
export const AuthContext = createContext<AuthContextType>({
    userName: "",
    setUserName: () => { },
});
export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {

    const [userName, setUserName] = useState<string | null>(localStorage.getItem("username"));
    const initialValue = { userName, setUserName }
    return (
        <AuthContext.Provider value={initialValue}>
            {children}
        </AuthContext.Provider>
    )
}