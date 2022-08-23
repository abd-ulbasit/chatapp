import axios from 'axios'
import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { UserReceivedForNewChatType } from '../../Models/Models'

const FindUser = () => {
    const [search, setSearch] = React.useState('')
    const [foundusers, setFoundUsers] = React.useState([])
    const handleFindUser = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

    }
    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
        setFoundUsers([])

    }
    useEffect(() => {
        if (search.trim().length === 0) return;
        const findfromdb = setTimeout(() => {
            axios.get("http://localhost:3000/finduser", {
                params: {
                    search
                }
            }).then(res => {
                if (res.data.length > 0) {
                    setFoundUsers(res.data)
                }
            }
            ).catch(err => {
                console.log(err);
            }
            )
        }, 1000)
        return () => {
            clearTimeout(findfromdb)
        }
    }, [search])
    return (
        <div>
            <form onSubmit={handleFindUser} >
                <input type="text" value={search} onChange={handleSearchInputChange} />
                <button>Find user</button>
            </form>
            {
                foundusers.length > 0 && <div>
                    {foundusers.map((eachuser: UserReceivedForNewChatType) => {
                        return (
                            <div>
                                <NavLink to={`/chat/${eachuser.username}`} >{eachuser.username}</NavLink>
                            </div>
                        )
                    })}
                </div>
            }
        </div>
    )
}

export default FindUser