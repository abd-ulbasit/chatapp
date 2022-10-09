import axios from 'axios'
import React, { useState, FC, useContext } from 'react'
import { useParams } from 'react-router'
import { ChatMessageType, ChatType } from '../../Models/Models'
import SendIcon from '@mui/icons-material/Send';
import { SingleChatContext } from '../../contexts/SingleChatContext';
const username = "Basit"

const ChatBottom: FC<{ chat: ChatType | undefined }> = ({ chat }) => {
    const SingleChatCtx = useContext(SingleChatContext)
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
        const newMessageToAppend: ChatMessageType = {
            message,
            sendername: username,
            receiver: {
                delivery: {
                    delivered: false,
                    deliveryTime: (new Date()).toISOString()
                },
                reading: {
                    read: false,
                    readTime: (new Date()).toISOString()
                }
            },
            timestamp: (new Date()).toISOString(),
        }
        console.log(chat?.person1 === username ? chat?.person2 : chat?.person1,)
        console.log(chat?.person2, chat?.person1)
            ;
        // console.log(message);
        axios.patch("http://localhost:3000/updatechat", {
            newMessage
        }).then(res => {
            // SingleChatCtx.setSingleChat((prev) => {
            //     return prev?.chat?.push(newMessageToAppend);
            // })
            if (res.data.message === "failed") {

                console.log("Chat Not in the database:")
                //?it means that the Chat is not in the database;
                // const newChatChat ={
                //     id: "1",
                //     sendername: username,
                //     message: message,
                //     timestamp: new Date().toISOString(),
                //     receiver: {
                //         delivery: {
                //             delivered: false,
                //             deliveryTime: new Date().toISOString(),
                //         },
                //         reading: {
                //             read: false,
                //             readTime: new Date().toISOString()
                //         }
                //     }
                // }
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
                    SingleChatCtx.setSingleChat(newChat);
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
        <form className="flex border-2 p-2" onSubmit={handlesendMessage} >
            <input type="text" onChange={(e) => { return setMessage(e.target.value) }} value={message} className="outline-none flex-grow border-2 p-1 rounded-md" />
            {<button className={`px-3  ${message.length > 0 ? "visible" : "invisible"}`} ><SendIcon></SendIcon></button>}
        </form>
    );
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