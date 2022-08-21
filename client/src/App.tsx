import './App.css'
import io from 'socket.io-client'
import { useEffect, useRef, useState } from 'react'

const socket = io('http://localhost:3000', {
  query: {
    id: '123basit'
  }
})
let first: boolean = true;
function App() {
  const roomref = useRef<HTMLInputElement>(null)
  const [chat, setChat] = useState([''])
  const [message, setMessage] = useState('')
  const [roomId, setRoomId] = useState('')
  useEffect(() => {
    if (!first) return;
    first = false;
    socket.on('receive-message', (message: string, id?: string) => {
      if (id) {
        message = id + ' : ' + message;
        setChat((chat) =>
          chat.concat(message)
        )
      } else {
        setChat((chat) =>
          chat.concat(message)
        )
      }
    })
  }
    , [socket])
  const sendMessage = () => {
    if (message.length == 0) return
    socket.emit('send-message', { message, roomId })
    setChat((chat) =>
      chat.concat(message)
    )
    setMessage('')
  }
  const handleJoinRoom = () => {
    socket.emit('join-room', roomref.current!.value, (id: string) => {
      setRoomId(id)
    })
  }
  socket.on
  return (
    <div className="App">
      {roomId !== "" && <h3>In room :{roomId} </h3>}
      <input type="text" ref={roomref}></input>
      <button onClick={handleJoinRoom}>Join Room</button>
      <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={sendMessage}>send message</button>
      {chat.map((cha, index) => (
        <p key={index}>{cha}</p>
      ))}
    </div>)
}

export default App
