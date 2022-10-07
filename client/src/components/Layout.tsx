import React, { FC } from 'react'
import { ChatType } from '../Models/Models'
import ChatBar from './ChatBar'
const Layout: FC<{ children: React.ReactNode, chats: ChatType[] }> = ({ chats, children }) => {
    return (
        <div className="">
            <ChatBar chats={chats} ></ChatBar>
            {children}
        </div>
    )
}

export default Layout