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
import { ThemeContext } from './contexts/ThemeContext'
import WelcomePage from './components/WelcomePage'
import { DeleteModelContext } from './contexts/DeleteModalContext'
import DeleteModal from './components/deleteChat/DeleteModal'
// const socket = io('http://localhost:3000', {
//   query: {
//     id: '123basit'
//   }
// })

function App() {
  // const minwidth=480;
  const meetsMinwidthlimit = screen.width > 479
    ;

  // useEffect(() => {
  //   let width = screen.availWidth;
  //   console.log(width);
  // }, [screen.availWidth]);
  const themeCtx = useContext(ThemeContext);
  const { userName: username } = useContext(AuthContext);
  const ChatsCtx = useContext(ChatContext);

  // const [chats, setChats] = React.useState<ChatType[]>([])
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_SERVER_URL}chats?username=${username}`,

    ).then(res => {
      const receivedChats = res.data;
      sortchatswrtTime(receivedChats)
      // console.log(receivedChats);
      ChatsCtx.setChats(receivedChats);
      // setChats(receivedChats)
      // console.log(chats)
    })
  }, [username])
  return (
    <div className={`${themeCtx.dark ? "dark" : ""}`}>
      {username && meetsMinwidthlimit &&
        <div className="">
          <Layout >
            <Routes>
              <Route path="/" element={<WelcomePage></WelcomePage>} />
              <Route path="/new" element={<NewChat></NewChat>} />
              <Route path="/chat/:id" element={<Chat></Chat>} />
              <Route path="/newchat/:id" element={<NewChatWithUser></NewChatWithUser>} />
            </Routes>
          </Layout>
        </div>
      }
      {!username && meetsMinwidthlimit &&
        <Routes>
          <Route path='/' element={<LogInPage></LogInPage>} />
          <Route path='/*' element={<NotFound></NotFound>} />
        </Routes>

      }
      {!meetsMinwidthlimit &&
        <div className='flex  justify-center items-center my-auto h-screen dark:bg-primary-900 dark:text-white '>
          This Page is not for your ScreenSize
        </div>
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
