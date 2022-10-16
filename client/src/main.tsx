import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from "react-router-dom"
import { ChatContextProvider } from './contexts/ChatsContext'
import { SingleChatContext, SingleChatContextProvider } from './contexts/SingleChatContext'
import { AuthProvider } from './contexts/AuthContext'
import { ThemeProvider } from './contexts/ThemeContext'
import { DeleteModelContextProvider } from './contexts/DeleteModalContext'
import { SocketContextProvider } from './contexts/SocketContext'
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChatContextProvider>
      <AuthProvider>
        <SocketContextProvider>
          <ThemeProvider>
            <SingleChatContextProvider>
              <DeleteModelContextProvider>
                <BrowserRouter>
                  <App />
                </BrowserRouter>
              </DeleteModelContextProvider>
            </SingleChatContextProvider>
          </ThemeProvider>
        </SocketContextProvider>
      </AuthProvider>
    </ChatContextProvider>
  </React.StrictMode>
)
