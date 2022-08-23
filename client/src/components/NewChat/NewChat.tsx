import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { UserReceivedForNewChatType } from '../../Models/Models'
import FindUser from './FindUser'
import classes from "./NewChat.module.css"
const NewChat = () => {
    const [newUsers, setNewUsers] = useState([])

    useEffect(() => {

    }, [])
    useEffect(() => {
        axios.get(`http://localhost:3000/users`).then(res => {
            const users = res.data.map((eachuser: UserReceivedForNewChatType) => {
                return eachuser.username
            })
            setNewUsers(users)

        }).catch(err => {
            console.log(err);

        })


    }, [])
    return (
        <div className={classes.main} >
            <FindUser></FindUser>
            <div className={classes.newusers} >
                {newUsers.map(user => {
                    return (
                        <NavLink to={"chat/:id"} >{user}</NavLink>
                    )
                })}
            </div>
        </div>
    )
}

export default NewChat