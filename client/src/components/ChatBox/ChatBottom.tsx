import axios from 'axios'
import React, { useState, FC, useContext } from 'react'
import { useParams } from 'react-router'
import { ChatMessageType, ChatType, message } from '../../Models/Models'
import SendIcon from '@mui/icons-material/Send';
import { SingleChatContext } from '../../contexts/SingleChatContext';
import { io } from "socket.io-client"
import { ChatContext } from '../../contexts/ChatsContext';
import { sortchatswrtTime } from "../../App"
import { AuthContext } from '../../contexts/AuthContext';
import { ThemeContext } from '../../contexts/ThemeContext';
const socket = io('http://localhost:3000', { protocols: 'echo-protocol' })
socket.emit('connection');
const ChatBottom: FC<{ chat: ChatType | undefined }> = ({ chat }) => {
    //moved the head of the git to this branch now pushing to github for testing.
    const { userName: username } = useContext(AuthContext);
    const SingleChatCtx = useContext(SingleChatContext);
    const { setSingleChat } = useContext(SingleChatContext)
    const ChatsCtx = useContext(ChatContext);
    const { dark } = useContext(ThemeContext)
    const { id: newRecipient } = useParams()
    const [message, setMessage] = useState('');
    socket.on('forward-message', (data) => {
        if (data.chatmate === username) {
            axios.get(`http://localhost:3000/chats?username=${username}`,

            ).then(res => {
                const receivedChats = res.data
                sortchatswrtTime(receivedChats)
                // console.log(receivedChats);
                ChatsCtx.setChats(receivedChats);
                const chat = ChatsCtx.chats?.find(c => c.person1 === username && c.person2 === newRecipient);
                if (chat) {
                    setSingleChat(chat);
                }

                // setChats(receivedChats)
                // console.log(chats);
            })
            // console.log("updating the chat");
            // axios.get(`http://localhost:3000/getupdatedChat?user1=${username}&user2=${data.chatmate}`).then((res) => {
            //     console.log(res);
            //     setSingleChat(res.data)
            // })
        }
    })
    const handlesendMessage = (e: React.FormEvent<HTMLFormElement> | undefined) => {
        e?.preventDefault();
        if (message.length === 0) return;

        const newMessage = {
            username: username,
            chatmate: chat?.person1 === username ? chat?.person2 : chat?.person1 || newRecipient,
            message: message,
            sendername: username,
            timestamp: new Date(),
            delivered: false,
            read: false,
            deliveryTime: new Date(),
            readTime: new Date()
        }
        socket.emit('message', newMessage);
        // socket.on('forward-message', (data) => {
        // if (data.chatmate === username) {
        //     // console.log("Its sent to me")
        //     console.log(data.message);
        //     const chatToshow: message = {
        //         message: data.message,
        //         sendername: data.username,
        //         timestamp: new Date().toISOString(),
        //         id: Math.random().toString(),
        //         receiver: {
        //             delivery: {
        //                 delivered: false,
        //                 deliveryTime: new Date().toISOString(),
        //             },
        //             reading: {
        //                 read: false,
        //                 readTime: new Date().toISOString(),
        //             }
        //         }
        //     }
        //     setSingleChat((prev: ChatType) => {
        //         return prev.chat?.concat(chatToshow);
        //     })
        // }

        // setSingleChat((prev) => {
        //     prev?.chat?.concat(data)
        // })
        // })
        const newMessageToAppend: ChatMessageType = {
            message,
            sendername: username!,
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
                    person1: username!,
                    person2: newRecipient,
                    chat: [{
                        id: "1",
                        sendername: username!,
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
            } else {
                console.log("Updated successfully");
                const Newchat = [{

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
                // setSingleChat((prev)=>{
                //     prev?.chat?.concat(Newchat);
                // })
            }
            //fetching the chats to update the chats
            axios.get(`http://localhost:3000/chats?username=${username}`,

            ).then(res => {
                const receivedChats = res.data
                sortchatswrtTime(receivedChats)
                // console.log(receivedChats);
                ChatsCtx.setChats(receivedChats);
                const chat = ChatsCtx.chats?.find(c => c.person1 === username && c.person2 === newRecipient);
                if (chat) {
                    setSingleChat(chat);
                }

                // setChats(receivedChats)
                // console.log(chats);
            }).catch(err => {
                console.log(err);
            })
        }).catch(err => {
            console.log(err);
        }
        )

        setMessage('')
    }
    return (
        <form className="flex p-2  bg-primary-200 dark:bg-primary-400  border-t border-t-primary-500" onSubmit={handlesendMessage} >
            <input type="text" onChange={(e) => { return setMessage(e.target.value) }} value={message} className="outline-none flex-grow text-grey-900 border-2 p-1 rounded-md" />
            {<button className={`px-3  ${message.length > 0 ? "visible" : "invisible"}`} ><SendIcon style={{ color: dark ? "white" : "darkgreen" }} ></SendIcon></button>}
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