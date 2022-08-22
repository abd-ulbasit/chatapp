import './App.css'
import io from 'socket.io-client'
import { } from 'react'
import { Routes, Route } from "react-router"
import LogInPage from './components/LogInPage'
import ChatBar from './components/ChatBar'
// const socket = io('http://localhost:3000', {
//   query: {
//     id: '123basit'
//   }
// })
function App() {
  return (
    <Routes>
      <Route path="/" element={<ChatBar></ChatBar>} />
    </Routes>)
}

export default App
