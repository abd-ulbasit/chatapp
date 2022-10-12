import React, { FC, useContext } from 'react'
import { Routes, Route } from 'react-router'
import ChatBar from './ChatBar'
import ChatBody from './ChatBox/ChatBody'
import ChatBottom from './ChatBox/ChatBottom'
import ChatHeader from './ChatBox/ChatHeader'
import { ChatMessageType, ChatType } from '../Models/Models'
import { useParams } from 'react-router'
import { ChatContext } from '../contexts/ChatsContext';
import { SingleChatContext } from '../contexts/SingleChatContext'
import { AuthContext } from '../contexts/AuthContext'
const Chat: FC = () => {
    const { userName: username } = useContext(AuthContext);
    const { setSingleChat } = useContext(SingleChatContext)
    const { chats } = useContext(ChatContext);
    // console.log(chats);
    const { id } = useParams();
    // console.log(id);
    const chat = chats?.find(c => c._id === id);
    if (chat) {
        setSingleChat(chat);
    }

    //TODO forward processed this chat in the chat body
    // console.log(chat);
    // console.log(chat);
    return (
        //returning the chat box from here
        <div className="flex flex-col items-stretch h-screen [&>*]:m-0 border-primary-600 bg-primary-200 dark:bg-primary-400">
            <div className="">
                <ChatHeader recipient={chat?.person1 === username ? chat?.person2 : chat?.person1}></ChatHeader>
            </div>
            <div className="flex-grow  overflow-scroll">
                <ChatBody ></ChatBody>
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