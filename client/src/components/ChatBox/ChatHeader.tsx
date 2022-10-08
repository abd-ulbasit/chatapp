import React, { FC } from 'react'
import { useParams } from 'react-router';
import Button from '../UI/Button';
import classes from "./ChatHeader.module.css"
const ChatHeader: FC<{ recipient: string | undefined }> = ({ recipient }) => {
    const { id: newRecipient } = useParams();
    return (
        <div className="flex justify-between [&>*]:mx-4">
            <div className="">
                <div>{recipient ? recipient : newRecipient}</div>
                <div>Offline</div>
            </div>
            <button onClick={() => console.log("Button cliked")}>Actions </button>
        </div>
    )
}

export default ChatHeader;