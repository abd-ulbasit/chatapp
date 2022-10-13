import AutoAnimate from "@formkit/auto-animate"
import React, { FC, useContext, useEffect, useRef } from 'react'
import { DeleteModelContext } from "../../contexts/DeleteModalContext"
import { SingleChatContext } from '../../contexts/SingleChatContext'
import { ChatMessageType, ChatType } from '../../Models/Models'
import DeleteModal from "../deleteChat/DeleteModal"
import ChatBubble from './ChatBubble'
const ChatBody: FC = () => {
    const SinglechatCtx = useContext(SingleChatContext);

    const { isopen } = useContext(DeleteModelContext);
    const divref = useRef<HTMLDivElement>(null)
    // const [listref]=useAut
    useEffect(() => {
        divref.current && AutoAnimate(divref.current)
    }, [divref])
    // useEffect(() => {
    // var elem = document.getElementById('ChatBox');
    // // elem!.scrollTop = elem!.scrollHeight;
    // // elem!.scrollTo()
    // elem?.scrollIntoView()
    //     elem!.scrollTop = 10000;
    // }, [SinglechatCtx.singleChat])
    return (


        <div className="flex flex-col justify-end h-full dark:bg-primary-400 bg-primary-200" id={"ChatBox"} ref={divref} >

            {SinglechatCtx.singleChat?.chat && SinglechatCtx.singleChat?.chat.map((message, index) => {
                return (
                    <ChatBubble key={index} chat={message} ></ChatBubble>
                )
            })
            }
            {
                isopen && <DeleteModal ></DeleteModal>
            }
        </div>
    )
}
    ;
export default ChatBody