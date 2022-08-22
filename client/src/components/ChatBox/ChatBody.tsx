import React, { FC } from 'react'
import { ChatType } from '../../Models/Models'

const ChatBody: FC<{ chat: ChatType | undefined }> = ({ chat }) => {
    console.log(chat)

    return (
        <>bod</>
    )
}

export default ChatBody