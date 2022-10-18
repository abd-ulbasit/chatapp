import React, { FC, useContext, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { DeleteModelContext } from '../../contexts/DeleteModalContext'
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { SingleChatContext } from '../../contexts/SingleChatContext';
import { sortchatswrtTime } from '../../App';
import { ChatContext } from '../../contexts/ChatsContext';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

// import { Close } from '@mui/icons-material';
const DeleteModal: FC = ({ }) => {
    const { setIsopen } = useContext(DeleteModelContext);
    const { singleChat } = useContext(SingleChatContext);
    const ChatsCtx = useContext(ChatContext);
    const { setSingleChat } = useContext(SingleChatContext);
    const { userName: username } = useContext(AuthContext);
    const nevigate = useNavigate()
    const handleDeleteChat = () => {
        axios.delete(`${import.meta.env.VITE_SERVER_URL}deleteChat?user1=${singleChat?.person1}&user2=${singleChat?.person2}`)
            .then(res => {
                console.log(res.status);
                axios.get(`${import.meta.env.VITE_SERVER_URL}chats?username=${username}`,
                ).then(res => {
                    const receivedChats = res.data
                    sortchatswrtTime(receivedChats)
                    ChatsCtx.setChats(receivedChats);
                    nevigate("/");
                }).catch(err => {
                    console.log(err);
                })
                setIsopen(false);
            })
            .catch(err => console.log(err))
    }
    return (
        createPortal(<>
            <div className='inset-0 fixed z-10 bg-slate-200 opacity-80 dark:opacity-100 dark:bg-slate-900 ' onClick={() => setIsopen(false)} >
            </div>
            <div className=' shadow-md  z-20 inset-x-16 inset-y-56 sm:inset-x-20 md:inset-x-52  fixed rounded-md text-slate-900 border-primary-900 border dark:bg-primary-500 mb-4 '>
                <div className='  bg-primary-300 rounded-md  font-mono font-bold flex flex-col h-full p-2 ' >
                    <div className=' flex content-end justify-end border-b-2 p-1 border-b-primary-700' ><button onClick={() => setIsopen(false)}><CloseIcon></CloseIcon></button></div>
                    <div className='flex-grow self-stretch  p-3 italic '><span className='text-red-700 font-semibold not-italic' >Warning!</span>This will delete Chat from your Chatmate as well!</div>
                    <div className='[&>*]:float-right' >
                        <button className='border border-primary-600 rounded-md hover:scale-[1.02] hover:bg-primary-500 px-4 py-2  hover:text-white hover:shadow-md m-2' onClick={handleDeleteChat} >Delete</button>
                        <button className='border border-primary-600 rounded-md hover:scale-[1.02] hover:bg-primary-500 px-4 py-2  hover:text-white hover:shadow-md m-2' onClick={() => setIsopen(false)}>Cancel</button>
                    </div>
                </div>

            </div>
        </>, document.getElementById('nexttoroot')!)
    )
}

export default DeleteModal;