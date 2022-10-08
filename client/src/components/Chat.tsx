import React, { FC } from 'react'
import { Routes, Route } from 'react-router'
import ChatBar from './ChatBar'
import ChatBody from './ChatBox/ChatBody'
import ChatBottom from './ChatBox/ChatBottom'
import ChatHeader from './ChatBox/ChatHeader'
import { ChatMessageType, ChatType } from '../Models/Models'
import { useParams } from 'react-router'
const username = "Basit"
const Chat: FC<{ chats: ChatType[] }> = ({ chats }) => {
    const { id } = useParams();
    console.log(id);
    const chat: ChatType | undefined = chats.find(c => c._id === id);
    console.log(chat);
    const processedChat: ChatMessageType[] | undefined = chat?.chat;
    console.log(processedChat);
    //TODO forward processed this chat in the chat body
    // console.log(chat);
    // console.log(chat)
    return (
        //returning the chat box from here
        <div className="flex flex-col items-stretch h-screen">
            <div className="">
                <ChatHeader recipient={chat?.person1 === username ? chat?.person2 : chat?.person1}></ChatHeader>
            </div>
            <div className="flex-grow border overflow-scroll">
                <ChatBody chat={processedChat}></ChatBody>
            </div>
            <div className="">
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