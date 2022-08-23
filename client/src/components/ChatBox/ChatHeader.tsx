import React, { FC } from 'react'
import { useParams } from 'react-router';
import Button from '../UI/Button';
import classes from "./ChatHeader.module.css"
const ChatHeader: FC<{ recipient: string | undefined }> = ({ recipient }) => {
    const { id: newRecipient } = useParams();
    return (
        <div className={classes.header}>
            <div className={classes.nameandstatus}>
                <div>{recipient ? recipient : newRecipient}</div>
                <div>Offline</div>
            </div>
            <button>.</button>
        </div>
    )
}

export default ChatHeader;