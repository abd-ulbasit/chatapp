import React, { FC, LegacyRef, MutableRefObject, useContext, useRef } from 'react'
import { AuthContext } from '../../contexts/AuthContext';
import { ChatMessageType } from '../../Models/Models'
const ChatBubble: FC<{ chat: ChatMessageType | undefined }> = ({ chat }) => {
    const divRef = React.useRef<HTMLDivElement>(null);
    const { userName: username } = useContext(AuthContext);
    return (

        <div className={`block clear-both border rounded-full px-3 max-w-[80%] m-2 w-fit  ${chat!.sendername == username ? "float-right" : ""}`}
            ref={divRef}>
            {chat?.message}
        </div>

    )
}

export default ChatBubble