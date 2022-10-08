import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { UserReceivedForNewChatType } from '../../Models/Models'

const FindUser = () => {
    const [searchInitialized, setSearchInitialized] = useState<boolean>(false);
    const [search, setSearch] = React.useState('');
    const [foundusers, setFoundUsers] = React.useState([]);
    const [loading, setLoading] = useState<boolean>();
    const handleFindUser = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

    }
    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        setLoading(true);
        setFoundUsers([]);

    }
    useEffect(() => {
        if (search.trim().length === 0) {
            setLoading(false);
            setSearchInitialized(false);
            return;
        }

        const findfromdb = setTimeout(() => {
            axios.get("http://localhost:3000/finduser", {
                params: {
                    search
                }
            }).then(res => {
                setSearchInitialized(true);
                setLoading(false);
                if (res.data.length > 0) {
                    setFoundUsers(res.data);
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
        <div className='flex flex-col mx-8  my-3 px-2'>
            <div>Find User</div>
            <form onSubmit={handleFindUser} className="w-full
            flex" >
                <input type="text" value={search} onChange={handleSearchInputChange} className="flex-grow p-2 rounded-lg" />
                {/* <button onClick={() => console.log("fetching the users")} className="mx-3 border rounded-lg px-2" >Find user</button> */}
            </form>
            {
                foundusers.length > 0 && <div>
                    {foundusers.map((eachuser: UserReceivedForNewChatType, index) => {
                        return (
                            <div key={index} className="border" >
                                <NavLink to={`/chat/${eachuser.username}`} >{eachuser.username}</NavLink>
                            </div>
                        )
                    })}
                </div>
            }
            {
                searchInitialized && foundusers.length === 0 && !loading && <div>
                    NO USER FOUND
                </div>
            }
            {
                loading && <div>Loading Users</div>
            }
        </div>
    )
}

export default FindUser