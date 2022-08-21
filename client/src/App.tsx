import './App.css'
import io from 'socket.io-client'
import { } from 'react'
import { Routes, Route } from "react-router"
import LogInPage from './components/LogInPage'
// const socket = io('http://localhost:3000', {
//   query: {
//     id: '123basit'
//   }
// })
function App() {
  return (
    <Routes>
      <Route path="/" element={<LogInPage></LogInPage>} />
    </Routes>)
}

export default App
