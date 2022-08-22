import React from 'react'
import ChatBar from './ChatBar'
import classes from "./LandingPage.module.css"
const LandingPage = () => {
    return (
        <div className={classes.page}>
            <div style={{ border: "2px solid red" }}>
                <ChatBar></ChatBar>
            </div>
            <p>chatbox</p>
        </div>
    )
}

export default LandingPage