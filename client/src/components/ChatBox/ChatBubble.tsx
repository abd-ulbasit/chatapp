import React, { FC, LegacyRef, MutableRefObject, useContext, useEffect, useRef } from 'react'
import { AuthContext } from '../../contexts/AuthContext';
import { ChatMessageType } from '../../Models/Models'
const ChatBubble: FC<{ chat: ChatMessageType | undefined }> = ({ chat }) => {
    const divRef = React.useRef<HTMLDivElement>(null);
    const { userName: username } = useContext(AuthContext);
    // useEffect(() => {
    //     var elem = document.getElementById('ChatBox');
    //     // // elem!.scrollTop = elem!.scrollHeight;
    //     // // elem!.scrollTo()
    //     elem?.scrollIntoView()
    // }, [])
    return (
        <div id={"Chatbox"} className={`block clear-both  rounded-full px-4 max-w-[80%] mx-2 my-1 w-fit  col-span-12  dark:text-dark  dark:bg-primary-500 bg-primary-300 ${chat!.sendername == username ? "ml-auto " : ""}`}
            ref={divRef}>
            {chat?.message}
        </div>
    )
}
export default ChatBubble