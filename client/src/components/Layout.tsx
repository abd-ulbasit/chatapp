import React, { FC } from 'react'
import { ChatType } from '../Models/Models'
import ChatBar from './ChatBar'
import classes from "./Layout.module.css"
const Layout: FC<{ children: React.ReactNode, chats: ChatType[] }> = ({ chats, children }) => {
    return (
        <div className={classes.layout}>
            <ChatBar chats={chats} ></ChatBar>
            {children}
        </div>
    )
}

export default Layout