import React, { FC, useContext } from 'react'
import { useParams } from 'react-router';
import { ThemeContext } from '../../contexts/ThemeContext';
import Button from '../UI/Button';
import classes from "./ChatHeader.module.css"
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { Checkbox } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { DeleteModelContext } from '../../contexts/DeleteModalContext';
const ChatHeader: FC<{ recipient: string | undefined }> = ({ recipient }) => {
    const { setIsopen, isopen } = useContext(DeleteModelContext)
    const { id: newRecipient } = useParams();
    const themeCtx = useContext(ThemeContext);
    const handleDarkMode = () => {
        themeCtx.setDark((prev) => !prev)
        console.log("Dark is ", themeCtx.dark);
    }
    const HandleDeleteClick = () => {
        setIsopen((prev) => !prev);
        console.log(isopen)
    }
    return (
        <div className="flex justify-between [&>*]:mx-4 h-16 align-middle items-center border-primary-500 border-b-2">
            <div className="">
                <div>{recipient ? recipient : newRecipient}</div>

            </div>
            <div className='flex' >

                <div className=' rounded-full w-25 h-25 border border-emerald-500 dark:bg-emerald-200 z-30 p-1 bg-emerald-500' >{<Checkbox style={{ color: `${themeCtx.dark ? "green" : "white"}` }}
                    onChange={handleDarkMode}
                    size={'medium'}
                    checked={themeCtx.dark!}
                    icon={<LightModeIcon ></LightModeIcon>}
                    checkedIcon={<DarkModeIcon></DarkModeIcon>}

                ></Checkbox>}</div>
                <button onClick={HandleDeleteClick}><DeleteForeverIcon></DeleteForeverIcon> </button>
            </div>
        </div >
    )
}

export default ChatHeader;