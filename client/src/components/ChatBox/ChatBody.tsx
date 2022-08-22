import React, { FC } from 'react'
import { ChatMessageType, ChatType } from '../../Models/Models'
import ChatBubble from './ChatBubble'
import classes from "./ChatBody.module.css"
const ChatBody: FC<{ chat: ChatMessageType[] | undefined }> = ({ chat }) => {

    return (
        <div className={classes.chatbody} >
            {chat?.map((message, index) => {
                return (
                    <ChatBubble key={index} chat={message} ></ChatBubble>

                )
            })
            }
        </div>
    )
}

export default ChatBody