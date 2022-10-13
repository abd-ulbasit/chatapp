import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { User } from '../../Models/Models'
import FindUser from './FindUser'
const NewChat = () => {
    const [newUsers, setNewUsers] = useState([])

    useEffect(() => {

    }, [])
    useEffect(() => {
        axios.get(`http://localhost:3000/newusers`).then(res => {
            const users = res.data.map((eachuser: User) => {
                return eachuser.username
            })
            setNewUsers(users)
            console.log(newUsers.length)
        }).catch(err => {
            console.log(err);

        })


    }, [])
    return (
        <div className="flex  flex-col  md:flex-row  h-screen bg-primary-200 dark:bg-primary-400 overflow-auto" >
            <div>
                <FindUser></FindUser>
            </div>
            <div className='h-5/6 w-1 bg-black py-3 align-middle mx-2 '></div>
            {/* //maping the recently joined users to the list */}
            <div className="flex flex-col align-center justify-center mx-auto" >
                <h1 className='text-center font-semibold text-2xl'>New USers to the App</h1>
                <div className='grid mx-3'>

                    {newUsers.map(user => {
                        // console.log(newUsers.length);
                        return (
                            <NavLink to={`/newchat/${user}`} key={user} >
                                <div className='border w-full mx-auto p-1 m-1  rounded-full px-2 text-center my-1 hover:scale-[1.02] hover:bg-primary-500 ' >
                                    {user}
                                </div>
                            </NavLink>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default NewChat