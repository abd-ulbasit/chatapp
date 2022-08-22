import './App.css'
import io from 'socket.io-client'
import { } from 'react'
import { Routes, Route } from "react-router"
import LogInPage from './components/LogInPage'
import LandingPage from './components/LandingPage'
// const socket = io('http://localhost:3000', {
//   query: {
//     id: '123basit'
//   }
// })
function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage></LandingPage>} />
    </Routes>)
}

export default App
