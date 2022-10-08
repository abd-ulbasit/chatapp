import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from "react-router-dom"
import { ChatContextProvider } from './contexts/ChatsContext'
import { SingleChatContext, SingleChatContextProvider } from './contexts/SingleChatContext'
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChatContextProvider>
      <SingleChatContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SingleChatContextProvider>
    </ChatContextProvider>
  </React.StrictMode>
)
