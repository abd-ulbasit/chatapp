import AutoAnimate from "@formkit/auto-animate"
import React, { FC, useContext, useEffect, useRef } from 'react'
import { SingleChatContext } from '../../contexts/SingleChatContext'
import { ChatMessageType, ChatType } from '../../Models/Models'
import ChatBubble from './ChatBubble'
const ChatBody: FC = () => {
    const SinglechatCtx = useContext(SingleChatContext);
    const divref = useRef<HTMLDivElement>(null)
    // const [listref]=useAut
    useEffect(() => {
        divref.current && AutoAnimate(divref.current)
    }, [divref])
    return (


        <div className="flex  flex-col content-end justify-end  h-full " ref={divref} >

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