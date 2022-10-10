import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import { AuthContext } from '../contexts/AuthContext';
import { ChatContext } from '../contexts/ChatsContext';
import { SingleChatContext } from '../contexts/SingleChatContext';
import { ChatType } from '../Models/Models';
const NewChatWithUser = () => {

    const { userName: username } = useContext(AuthContext);
    const navigate = useNavigate();
    const { chats } = useContext(ChatContext);
    const { setSingleChat } = useContext(SingleChatContext)
    const { id } = useParams();
    console.log(chats);
    console.log(id)
    const chat = chats?.filter((chat) => {
        return chat.person1 === id || chat.person2 === id
    })
    console.log(chat);
    if (chat) {
        // if (chat.length >= 0) return;
        if (chat.length > 0) {

            const Chat = chat[0];
            setSingleChat(Chat);
            console.log('nevigaitng');
            useEffect(() => {
                navigate(`/chat/${Chat._id}`);
            }, [])
        }
        if (chat.length === 0) {
            useEffect(() => {
                //starting a new Chat 
                const newChat: ChatType = {
                    person1: username!,
                    person2: id,

                }
                setSingleChat(newChat);
                navigate(`/chat/${id}`);
            })
            //TODO think & configure what will happen if no chat exists
            console.log("New Chat Starting")
        }
    }



    return (
        <div>NewChatWithUser</div>
    )
}

export default NewChatWithUser