import io from 'socket.io-client'
import { useContext, useEffect } from 'react'
import { Routes, Route } from "react-router"
import Chat from './components/Chat'
import Layout from './components/Layout'
import React from 'react'
import axios from 'axios'
import { ChatType } from "./Models/Models"
import NewChat from './components/NewChat/NewChat'
import NewChatWithUser from './components/NewChatWithUser'
import { ChatContext } from './contexts/ChatsContext'
import { AuthContext } from './contexts/AuthContext'
import NotFound from './components/UI/NotFound'
import LogInPage from './components/login/LogInPage'
// const socket = io('http://localhost:3000', {
//   query: {
//     id: '123basit'
//   }
// })

function App() {
  const { userName: username } = useContext(AuthContext);
  const ChatsCtx = useContext(ChatContext);

  // const [chats, setChats] = React.useState<ChatType[]>([])
  useEffect(() => {
    axios.get(`http://localhost:3000/chats?username=${username}`,

    ).then(res => {
      const receivedChats = res.data
      sortchatswrtTime(receivedChats)
      // console.log(receivedChats);
      ChatsCtx.setChats(receivedChats);
      // setChats(receivedChats)
      // console.log(chats)
    })
  }, [])
  return (
    <div className='dark'>
      {username &&
        <div className="">
          <Layout >
            <Routes>
              <Route path="/" element={<div>Hello</div>} />
              <Route path="/new" element={<NewChat></NewChat>} />
              <Route path="/chat/:id" element={<Chat></Chat>} />
              <Route path="/newchat/:id" element={<NewChatWithUser></NewChatWithUser>} />
            </Routes>
          </Layout>
        </div>
      }
      {!username &&
        <Routes>
          <Route path='/' element={<LogInPage></LogInPage>} />
          <Route path='/*' element={<NotFound></NotFound>} />
        </Routes>

      }
    </div>
  )
}

export default App


export function sortchatswrtTime(chats: ChatType[]) {
  chats.sort(function (a, b) {

    return (a.chat![a.chat!.length - 1].timestamp < b.chat![b.chat!.length - 1].timestamp) ? 1 : -1
  })
}
