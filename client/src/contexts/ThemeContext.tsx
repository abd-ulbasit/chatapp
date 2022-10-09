import { createContext, FC, ReactNode, SetStateAction, useState } from "react";
import { Dispatch } from "react";
type themecontextType = {
    dark: boolean | null,
    setDark: Dispatch<SetStateAction<| null | boolean>>
}
export const ThemeContext = createContext<themecontextType>({
    dark: false,
    setDark: () => { },
});
export const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {

    const [dark, setDark] = useState<boolean | null>(Boolean(localStorage.getItem('dark')));
    const initialValue = { dark, setDark }
    return (
        <ThemeContext.Provider value={initialValue}>
            {children}
        </ThemeContext.Provider>
    )
}