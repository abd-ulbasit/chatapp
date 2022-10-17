import React, { useContext, useEffect } from 'react'
import { FC } from 'react';
import { NavLink } from "react-router-dom"
import { ChatType } from '../Models/Models';
import AddIcon from '@mui/icons-material/Add';
import { ChatContext } from '../contexts/ChatsContext';
import { AuthContext } from '../contexts/AuthContext';


const sendersMessageStyle = { marginLeft: "0px", marginRight: "auto", width: "fit-content", marginBottom: "5px", marginTop: "5px" };
const recipientsMessageStyle = { marginLeft: "auto", marginRight: "0px", width: "fit-content", marginBottom: "5px", marginTop: "5px" };
const ChatBar: FC = () => {
    const { userName: username } = useContext(AuthContext);
    const chatsCtx = useContext(ChatContext);
    // const link = `/chat/${chat._id}`
    return (
        <div className=" md:w-1/3 w-5/12 lg:w-1/4 overflow-y-auto relative bg-primary-200 dark:bg-primary-400 border-r-2 border-r-primary-400" >
            <div className="bg-primary-300 dark:bg-primary-400 sticky w-full top-0 flex justify-between p-3 items-center rounded-b-md" >
                <NavLink to={'/'} >{username}</NavLink>
                <NavLink to={"new"}
                    className=" rounded-full p-2 mr-3 bg-primary-400 dark:bg-primary-500"
                    style={({ isActive }) => {
                        return isActive ? {
                            outline: "2px black solid"
                        } : {}
                    }} >
                    <AddIcon></AddIcon>
                </NavLink>
            </div>
            <div className="pb-16" >
                {chatsCtx.chats!.map((chat: ChatType) => {
                    return (
                        <div className='border border-primary-600 rounded-md m-1  overflow-hidden dark:bg-primary-500 hover:dark:bg-primary-200 bg-primary-200 hover:bg-primary-400 hover:scale-[1.02] transition-all' key={chat._id} >
                            <NavLink to={`chat/${chat._id}`} end

                                key={chat._id}
                                className={(e) => {
                                    if (e.isActive) {
                                        return "scale-105 bg-primary-300 transition-all rounded-md"
                                    }
                                    else {
                                        return "rounded-md"
                                    }
                                }
                                }
                            >
                                <div className='bg-inherit p-1'>
                                    <div className=''>

                                        <div className="">
                                            {chat.person1 === username ? chat.person2 : chat.person1}
                                        </div>
                                        <div className="truncate rounded-md italic px-2 text-sm" style={chat.chat ? chat.chat[chat.chat.length - 1].sendername != username ? sendersMessageStyle : recipientsMessageStyle : {}} >
                                            {chat.chat && chat.chat[chat.chat.length - 1].message}
                                        </div>
                                    </div>
                                </div>
                            </NavLink>

                        </div>
                    )
                })}
            </div>
        </div >
    )
}

export default ChatBar;



