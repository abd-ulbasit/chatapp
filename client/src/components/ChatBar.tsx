import React, { useEffect } from 'react'
import { FC } from 'react';
import { NavLink } from "react-router-dom"
import axios from "axios";
const username = "Basit"
import classes from "./ChatBar.module.css"
import { ChatType } from '../Models/Models';

const sendersMessageStyle = { color: '#6b4b91' }
const recipientsMessageStyle = { color: '#420101', padding: "0 38px " }

const ChatBar: FC<{ chats: ChatType[] }> = ({ chats }) => {

    // const link = `/chat/${chat._id}`
    return (
        <div className={classes.chatbar}>
            {chats.map((chat: ChatType) => {
                return (
                    <NavLink to={`chat/${chat._id}`} className={classes.chatbarchat} end
                        style={({ isActive }) => {
                            return isActive ? { backgroundColor: "red" } : {}
                        }}
                        key={chat._id}
                    >

                        <div className={classes.chatbarname}>
                            {chat.person1 === username ? chat.person2 : chat.person1}
                        </div>
                        <div className={classes.lastmessage} style={chat.chat[chat.chat.length - 1].sendername != username ? sendersMessageStyle : recipientsMessageStyle} >
                            {chat.chat[chat.chat.length - 1].message}
                        </div>
                    </NavLink>
                )
            })}
        </div>
    )
}

export default ChatBar;



