import React, { FC } from 'react'
import Button from '../UI/Button';
import classes from "./ChatHeader.module.css"
const ChatHeader: FC<{ recipient: string | undefined }> = ({ recipient }) => {
    return (
        <div className={classes.header}>
            <div className={classes.nameandstatus}>
                <div>{recipient ? recipient : "I am a user"}</div>
                <div>Offline</div>
            </div>
            <button>.</button>
        </div>
    )
}

export default ChatHeader;