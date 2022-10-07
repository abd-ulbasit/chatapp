import './App.css'
import io from 'socket.io-client'
import { useEffect } from 'react'
import { Routes, Route } from "react-router"
import LogInPage from './components/LogInPage'
import Chat from './components/Chat'
import ChatBar from './components/ChatBar'
import Layout from './components/Layout'
import React from 'react'
import axios from 'axios'
import { ChatType } from "./Models/Models"
import NewChat from './components/NewChat/NewChat'
const username = "Basit"
// const socket = io('http://localhost:3000', {
//   query: {
//     id: '123basit'
//   }
// })

function App() {
  const [chats, setChats] = React.useState<ChatType[]>([])
  useEffect(() => {
    axios.get(`http://localhost:3000/chats?username=${username}`,

    ).then(res => {
      const receivedChats = res.data
      sortchatswrtTime(receivedChats)
      console.log(receivedChats);
      setChats(receivedChats)
      console.log(chats)
    })
  }, [])
  return (
    <div className="app " >
      <Layout chats={chats} >
        <Routes>
          <Route path="/new" element={<NewChat></NewChat>} />
          <Route path="/chat/:id" element={<Chat chats={chats} ></Chat>} />
          <Route path="/new" element={<NewChat></NewChat>} />

        </Routes>
      </Layout>
    </div>
  )
}

export default App


function sortchatswrtTime(chats: ChatType[]) {
  chats.sort(function (a, b) {
    return (a.chat[a.chat.length - 1].timestamp < b.chat[b.chat.length - 1].timestamp) ? 1 : -1
  }
  )
}
