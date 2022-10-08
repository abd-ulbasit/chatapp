import React, { FC } from 'react'
import { ChatType } from '../Models/Models'
import ChatBar from './ChatBar'
const Layout: FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="flex [&>*]:border [&>*]:border-black h-screen p-0 m-0">
            <ChatBar></ChatBar>
            <div className='flex-grow'>
                {children}
            </div>
        </div>
    )
}

export default Layout