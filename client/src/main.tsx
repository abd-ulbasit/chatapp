import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from "react-router-dom"
import { ChatContextProvider } from './contexts/ChatsContext'
import { SingleChatContext, SingleChatContextProvider } from './contexts/SingleChatContext'
import { AuthProvider } from './contexts/AuthContext'
import { ThemeProvider } from './contexts/ThemeContext'
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChatContextProvider>
      <AuthProvider>
        <ThemeProvider>
          <SingleChatContextProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </SingleChatContextProvider>
        </ThemeProvider>
      </AuthProvider>
    </ChatContextProvider>
  </React.StrictMode>
)
