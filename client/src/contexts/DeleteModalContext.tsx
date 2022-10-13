import { createContext, FC, ReactNode, SetStateAction, useState } from "react";
import { Dispatch } from "react";
type deleteModelcontextType = {
    isopen: boolean | null,
    setIsopen: Dispatch<SetStateAction<| null | boolean>>
}
export const DeleteModelContext = createContext<deleteModelcontextType>({
    isopen: false,
    setIsopen: () => { },
});
export const DeleteModelContextProvider: FC<{ children: ReactNode }> = ({ children }) => {

    const [isopen, setIsopen] = useState<boolean | null>(false);
    const initialValue = { isopen, setIsopen }
    return (
        <DeleteModelContext.Provider value={initialValue}>
            {children}
        </DeleteModelContext.Provider>
    )
}