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
        axios.get(`http://localhost:3000/users`).then(res => {
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
        <div className="flex  flex-col  sm:flex-row items-stretch h-screen" >
            <div>


                <FindUser></FindUser>
            </div>
            <div className='h-5/6 sm:w-1 bg-black py-3 align-middle invisible '></div>
            {/* //maping the recently joined users to the list */}
            <div className="flex flex-col align-center justify-center mx-auto" >
                <h1 className='text-center font-semibold text-2xl'>New USers to the App</h1>
                <div className='flex  flex-wrap '>

                    {newUsers.map(user => {
                        // console.log(newUsers.length);
                        return (
                            <div className='border w-1/2 mx-auto p-2 m-1 ' >
                                <NavLink to={`/newchat/${user}`} key={user} >
                                    {user}
                                </NavLink>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default NewChat