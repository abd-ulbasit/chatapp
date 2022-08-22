import axios from 'axios'
import React, { useState, FC } from 'react'
import { ChatType } from '../../Models/Models'
import Button from '../UI/Button'
import classes from "./ChatBottom.module.css"
const username = "Basit"
const ChatBottom: FC<{ chat: ChatType | undefined }> = ({ chat }) => {
    const [message, setMessage] = useState('')
    const handlesendMessage = (e: React.FormEvent<HTMLFormElement> | undefined) => {
        e?.preventDefault();
        const newMessage = {
            username: username,
            chatmate: chat?.person1 === username ? chat?.person2 : chat?.person1,
            message: message,
            sendername: username,
            timestamp: new Date(),
            delivered: false,
            read: false,
            deliveryTime: new Date(),
            readTime: new Date()
        }
        console.log(chat?.person1 === username ? chat?.person2 : chat?.person1,)
        console.log(chat?.person2, chat?.person1)
            ;
        // console.log(message);
        axios.patch("http://localhost:3000/updatechat", {
            newMessage
        }).then(res => {
            console.log(res);
        })

    }
    return (
        <form className={classes.main} onSubmit={handlesendMessage} >
            <input type="text" onChange={(e) => { return setMessage(e.target.value) }} value={message} />
            <button>Send message</button>
        </form>
    )
}

export default ChatBottom;

// {
    // "username": "Basit",
    // "chatmate": "usman",
    // "sendername": "Basit",
    // "message": "HEllo G000000000",
    // "timestamp": "2022-08-21T05:10:49.059Z",
    // "delivered": true,
    // "deliverTime": "2022-08-21T05:10:49.059Z",
    // "read": true,
    // "readTime": "2022-08-21T05:10:49.059Z"
//   }