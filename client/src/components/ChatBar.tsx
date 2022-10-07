import React, { useEffect } from 'react'
import { FC } from 'react';
import { NavLink } from "react-router-dom"
import axios from "axios";
const username = "Basit"
import { ChatType } from '../Models/Models';

const sendersMessageStyle = { marginLeft: "0px", marginRight: "auto", width: "fit-content", padding: "5px", borderRadius: "5px", backgroundColor: "#f5f5f5", border: "1px solid #ccc", marginBottom: "5px", marginTop: "5px" };
const recipientsMessageStyle = { marginLeft: "auto", marginRight: "0px", width: "fit-content", padding: "5px", borderRadius: "5px", backgroundColor: "#f5f5f5", border: "1px solid #ccc", marginBottom: "5px", marginTop: "5px" };


const ChatBar: FC<{ chats: ChatType[] }> = ({ chats }) => {

    // const link = `/chat/${chat._id}`
    return (
        <div className="">
            <div className="" >
                <h3 className="" >{username}</h3>
                <NavLink to={"new"}
                    className=""
                    style={({ isActive }) => {
                        return isActive ? {
                            backgroundColor: "purple",
                            outline: "3px solid white"
                        } : {}
                    }} >
                    +
                </NavLink>
            </div>
            <div className="" >

                {chats.map((chat: ChatType) => {
                    return (
                        <>
                            <NavLink to={`chat/${chat._id}`} className="" end
                                style={({ isActive }) => {
                                    return isActive ? { backgroundColor: "purple" } : {}
                                }}
                                key={chat._id}
                            >

                                <div className="">
                                    {chat.person1 === username ? chat.person2 : chat.person1}
                                </div>
                                <div className="" style={chat.chat[chat.chat.length - 1].sendername != username ? sendersMessageStyle : recipientsMessageStyle} >
                                    {chat.chat[chat.chat.length - 1].message}
                                </div>
                            </NavLink>

                        </>
                    )
                })}
            </div>
        </div>
    )
}

export default ChatBar;



