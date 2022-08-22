import React, { FC } from 'react'
import { Routes, Route } from 'react-router'
import ChatBar from './ChatBar'
import ChatBody from './ChatBox/ChatBody'
import ChatBottom from './ChatBox/ChatBottom'
import ChatHeader from './ChatBox/ChatHeader'
import classes from "./Chat.module.css"
import Layout from './Layout'
import { ChatType } from '../Models/Models'
import { useParams } from 'react-router'
const username = "Basit"
const Chat: FC<{ chats: ChatType[] }> = ({ chats }) => {
    const { id } = useParams();
    const chat = chats.find(c => c._id === id)
    console.log(chat);
    return (
        //returning the chat box from here
        <div className={classes.chatbox}>
            <div className={classes.header}>
                <ChatHeader recipient={chat?.person1 === username ? chat?.person2 : chat?.person1}></ChatHeader>
            </div>
            <div className={classes.body}>
            </div>
            <ChatBody chat={chat}></ChatBody>
            <div className={classes.bottom}>
                <ChatBottom></ChatBottom>
            </div>
        </div>


        // {/*         
        // chat box header is like whatsApp chat header that has the name of the person you are chatting with.

        // chat box body is like whatsApp chat body that has the messages you have sent and received.

        // chat box footer is like whatsApp chat footer that has the input field and send button.
        //  */}



    )
}

export default Chat;