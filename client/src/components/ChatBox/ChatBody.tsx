import React, { FC } from 'react'
import { ChatMessageType, ChatType } from '../../Models/Models'
import ChatBubble from './ChatBubble'
const ChatBody: FC<{ chat: ChatMessageType[] | undefined }> = ({ chat }) => {

    return (
        <div className="" >
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