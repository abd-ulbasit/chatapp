import axios from 'axios'
import React, { useState } from 'react'
import Button from '../UI/Button'
import classes from "./ChatBottom.module.css"
const ChatBottom = () => {
    const [message, setMessage] = useState('')
    const handlesendMessage = (e: React.FormEvent<HTMLFormElement> | undefined) => {
        e?.preventDefault()
        // console.log(message);
        axios.patch("http://localhost:3000/updatechat", {

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
//     "username": "Basit",
//     "chatmate": "usman",
//     "sendername": "Basit",
//     "message": "HEllo G000000000",
//     "timestamp": "2022-08-21T05:10:49.059Z",
//     "delivered": true,
//     "deliverTime": "2022-08-21T05:10:49.059Z",
//     "read": true,
//     "readTime": "2022-08-21T05:10:49.059Z"
//   }