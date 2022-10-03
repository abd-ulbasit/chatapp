import axios from 'axios'
import React, { useState, FC } from 'react'
import { useParams } from 'react-router'
import { ChatType } from '../../Models/Models'
import Button from '../UI/Button'
import classes from "./ChatBottom.module.css"
const username = "Basit"
const ChatBottom: FC<{ chat: ChatType | undefined }> = ({ chat }) => {
    const { id: newRecipient } = useParams()
    const [message, setMessage] = useState('')
    const handlesendMessage = (e: React.FormEvent<HTMLFormElement> | undefined) => {
        e?.preventDefault();
        if (message.length === 0) return;
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
            if (res.data.message === "failed") {

                //?it means that the user is not in the database
                const newChat: ChatType = {
                    person1: username,
                    person2: newRecipient,
                    chat: [{
                        id: "1",
                        sendername: username,
                        message: message,
                        timestamp: new Date().toISOString(),
                        receiver: {
                            delivery: {
                                delivered: false,
                                deliveryTime: new Date().toISOString(),
                            },
                            reading: {
                                read: false,
                                readTime: new Date().toISOString()
                            }
                        }
                    }
                    ]
                }
                axios.post("http://localhost:3000/newchat", {
                    newChat
                }).then(res => {
                    console.log(res.data);
                }
                ).catch(err => {
                    console.log(err);
                }
                )
            }



            console.log(res.data.message);
        }).catch(err => {
            console.log(err);
        }
        )

    }
    return (
        <form className={classes.main} onSubmit={handlesendMessage} >
            <input type="text" onChange={(e) => { return setMessage(e.target.value) }} value={message} />
            {message.length > 0 && <button>Send message</button>}
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


//new chat type
    // {
    //     "person1": "Basit",
    //     "person2": "Hanzala",
    //     "chat": [
    //       {
    //         "sendername": "Basit",
    //         "message": "hello Aji",
    //         "timestamp": "2022-08-21T16:38:34.551Z",
    //         "receiver": {
    //           "delivery": {
    //             "delivered": true,
    //             "deliverTime": "2022-08-21T16:38:34.551Z"
    //           },
    //           "reading": {
    //             "read": true,
    //             "readTime": "2022-08-21T16:38:34.551Z"
    //           }
    //         }
    //       }
    //     ]