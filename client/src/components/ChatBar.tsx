import React, { useEffect } from 'react'
import { FC } from 'react';
import { NavLink } from "react-router-dom"
import axios from "axios";
const username = "Basit"
import classes from "./ChatBar.module.css"
interface Chat {

    _id: string,
    person1: string,
    person2: string,
    chat: [{
        message: string,
        sendername: string,
        timestamp: string
        id: string
        receiver: {
            delivery: {
                delivered: boolean,
                deliveryTime: string
            },
            reading: {
                read: boolean
                readTime: string
            }

        }

    }]
}
const sendersMessageStyle = { color: 'pink' }
const recipientsMessageStyle = { color: '#00ff00', padding: "0 38px " }

const ChatBar = () => {
    const [chats, setChats] = React.useState<Chat[]>([])
    useEffect(() => {
        axios.get(`http://localhost:3000/chats?username=${username}`,

        ).then(res => {
            console.log(res.data)
            const receivedChats = res.data
            sortchatswrtTime(receivedChats)
            console.log(receivedChats);
            setChats(receivedChats)
        })
    }, [])
    return (
        <div className={classes.chatbar}>
            {chats.map((chat: Chat) => {
                return (
                    <NavLink to={`/chat/${chat._id}`} className={classes.chatbarchat}>

                        <div className={classes.chatbarname}>
                            {chat.person1 === username ? chat.person2 : chat.person1}
                        </div>
                        <div className={classes.lastmessage} style={chat.chat[chat.chat.length - 1].sendername != username ? sendersMessageStyle : recipientsMessageStyle} >
                            {chat.chat[chat.chat.length - 1].message}
                        </div>

                    </NavLink>
                )
            })}
        </div>
    )
}

export default ChatBar;



function sortchatswrtTime(chats: Chat[]) {
    chats.sort(function (a, b) {
        return (a.chat[a.chat.length - 1].timestamp < b.chat[b.chat.length - 1].timestamp) ? 1 : -1
    }
    )
}
