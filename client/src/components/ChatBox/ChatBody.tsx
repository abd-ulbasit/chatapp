import React, { FC, useContext } from 'react'
import { SingleChatContext } from '../../contexts/SingleChatContext'
import { ChatMessageType, ChatType } from '../../Models/Models'
import ChatBubble from './ChatBubble'
const ChatBody: FC = () => {
    const SinglechatCtx = useContext(SingleChatContext);
    return (
        <div className="overflow-scroll" >
            {SinglechatCtx.singleChat?.chat && SinglechatCtx.singleChat?.chat.map((message, index) => {
                return (
                    <ChatBubble key={index} chat={message} ></ChatBubble>
                )
            })
            }
        </div>
    )
}

export default ChatBody