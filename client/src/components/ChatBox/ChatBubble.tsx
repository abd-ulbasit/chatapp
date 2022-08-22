import React, { FC } from 'react'
import { ChatMessageType } from '../../Models/Models'
import classes from "./ChatBubble.module.css"
const username = "Basit"
const ChatBubble: FC<{ chat: ChatMessageType | undefined }> = ({ chat }) => {
    return (
        <div>
            <div className={chat?.sendername === username ? classes.sent : classes.received} >
                {chat?.message}
            </div>
        </div>
    )
}

export default ChatBubble