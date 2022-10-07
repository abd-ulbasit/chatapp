import React, { FC } from 'react'
import { ChatMessageType } from '../../Models/Models'
const username = "Basit"
const ChatBubble: FC<{ chat: ChatMessageType | undefined }> = ({ chat }) => {
    return (
        <div>
            <div className="" >
                {chat?.message}
            </div>
        </div>
    )
}

export default ChatBubble