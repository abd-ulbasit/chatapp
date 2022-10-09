import React, { FC, useContext } from 'react'
import LogInForm from './LogInForm'
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { Checkbox } from '@mui/material';
import { ThemeContext } from '../../contexts/ThemeContext';
const LogInPage: FC = () => {
    const themeCtx = useContext(ThemeContext);
    const handleDarkMode = () => {
        themeCtx.setDark((prev) => !prev)
        console.log("Dark is ", themeCtx.dark);
    }
    return (
        <div className='flex justify-center items-center h-screen bg-slate-200 dark:bg-slate-500
        text-slate-900'>

            <LogInForm></LogInForm>
            <div className='fixed bottom-5 left-0 pl-5 rounded-r-full w-25 h-25 border border-slate-900 dark:bg-slate-200 z-30 p-1 bg-slate-500' >{<Checkbox style={{ color: `${themeCtx.dark ? "slateblue" : "white"}` }}
                onChange={handleDarkMode}
                size={'medium'}
                checked={themeCtx.dark!}
                icon={<LightModeIcon ></LightModeIcon>}
                checkedIcon={<DarkModeIcon></DarkModeIcon>}

            ></Checkbox>}</div>
        </div>
    )
}

export default LogInPage