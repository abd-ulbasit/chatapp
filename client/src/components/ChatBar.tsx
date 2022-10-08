import React, { useContext, useEffect } from 'react'
import { FC } from 'react';
import { NavLink } from "react-router-dom"
import axios from "axios";
const username = "Basit"
import { ChatType } from '../Models/Models';
import AddIcon from '@mui/icons-material/Add';
import { ChatContext } from '../contexts/ChatsContext';

const sendersMessageStyle = { marginLeft: "0px", marginRight: "auto", width: "fit-content", border: "1px solid #ccc", marginBottom: "5px", marginTop: "5px" };
const recipientsMessageStyle = { marginLeft: "auto", marginRight: "0px", width: "fit-content", border: "1px solid #ccc", marginBottom: "5px", marginTop: "5px" };


const ChatBar: FC = () => {
    const chatsCtx = useContext(ChatContext);
    // const link = `/chat/${chat._id}`
    return (
        <div className=" md:w-1/3 w-5/12 lg:w-1/4 overflow-y-auto relative  ">
            <div className="bg-blue-700 sticky w-full top-0 flex justify-between p-3 items-center " >
                <h3 className="" >{username}</h3>
                <NavLink to={"new"}
                    className=" rounded-full p-2 mr-3 bg-yellow-400"
                    style={({ isActive }) => {
                        return isActive ? {
                            backgroundColor: "yellow"
                        } : {}
                    }} >
                    <AddIcon></AddIcon>
                </NavLink>
            </div>
            <div className="" >

                {chatsCtx.chats!.map((chat: ChatType) => {
                    return (
                        <div className='border m-1  overflow-hidden' key={chat._id} >
                            <NavLink to={`chat/${chat._id}`} end
                                style={({ isActive }) => {
                                    return isActive ? {
                                        color: "red",
                                        backgroundColor: "pink",
                                        border: "2px red solid"
                                    } : {}
                                }}
                                key={chat._id}
                                className={({ isActive }) => {
                                    return isActive ? "bg-red-300 scale-105" : ""
                                }}
                            >
                                <div className=''>

                                    <div className="">
                                        {chat.person1 === username ? chat.person2 : chat.person1}
                                    </div>
                                    <div className="truncate rounded-sm" style={chat.chat ? chat.chat[chat.chat.length - 1].sendername != username ? sendersMessageStyle : recipientsMessageStyle : {}} >
                                        {chat.chat && chat.chat[chat.chat.length - 1].message}
                                    </div>
                                </div>
                            </NavLink>

                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ChatBar;



