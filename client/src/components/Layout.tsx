import React, { FC, useContext } from 'react'
import { ChatType } from '../Models/Models'
import ChatBar from './ChatBar'
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { Checkbox } from '@mui/material';
import { ThemeContext } from '../contexts/ThemeContext';


const Layout: FC<{ children: React.ReactNode }> = ({ children }) => {
    const themeCtx = useContext(ThemeContext);
    const handleDarkMode = () => {
        themeCtx.setDark((prev) => !prev)
        console.log("Dark is ", themeCtx.dark);
    }
    return (
        <div className="flex h-screen p-0 m-0">
            <ChatBar></ChatBar>


            <div className='flex-grow'>
                {children}
            </div>
            <div className='fixed bottom-5 left-0 pl-5 rounded-r-full w-25 h-25 border border-primary-500 dark:bg-primary-200 z-30 p-1 bg-primary-500' >
                {<Checkbox style={{ color: `${themeCtx.dark ? "black" : "white"}` }}
                    onChange={handleDarkMode}
                    size={'medium'}
                    checked={themeCtx.dark!}
                    icon={<LightModeIcon ></LightModeIcon>}
                    checkedIcon={<DarkModeIcon></DarkModeIcon>}

                ></Checkbox>}</div>
        </div>
    )
}

export default Layout