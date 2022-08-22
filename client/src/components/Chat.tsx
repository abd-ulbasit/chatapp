import React, { FC } from 'react'
import { Routes, Route } from 'react-router'
import ChatBar from './ChatBar'
import ChatBody from './ChatBox/ChatBody'
import ChatBottom from './ChatBox/ChatBottom'
import ChatHeader from './ChatBox/ChatHeader'
import classes from "./Chat.module.css"
import Layout from './Layout'
import { ChatMessageType, ChatType } from '../Models/Models'
import { useParams } from 'react-router'
const username = "Basit"
const Chat: FC<{ chats: ChatType[] }> = ({ chats }) => {
    const { id } = useParams();
    const chat: ChatType | undefined = chats.find(c => c._id === id);
    const processedChat: ChatMessageType[] | undefined = chat?.chat;
    // console.log(processedChat);
    //TODO forward prodcessed this chat in the chat body
    // console.log(chat);
    // console.log(chat)
    return (
        //returning the chat box from here
        <div className={classes.chatbox}>
            <div className={classes.header}>
                <ChatHeader recipient={chat?.person1 === username ? chat?.person2 : chat?.person1}></ChatHeader>
            </div>
            <div className={classes.body}>
            </div>
            <ChatBody chat={processedChat}></ChatBody>
            <div className={classes.bottom}>
                <ChatBottom chat={chat}></ChatBottom>
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