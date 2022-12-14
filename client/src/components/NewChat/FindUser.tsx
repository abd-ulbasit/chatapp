import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import { User } from '../../Models/Models'
const FindUser = () => {

    const { userName: username } = useContext(AuthContext);
    const [searchInitialized, setSearchInitialized] = useState<boolean>(false);
    const [search, setSearch] = React.useState('');
    const [foundusers, setFoundUsers] = React.useState<User[]>([]);
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
            axios.get(`${import.meta.env.VITE_SERVER_URL}finduser`, {
                params: {
                    search
                }
            }).then(res => {
                setSearchInitialized(true);
                setLoading(false);
                if (res.data.length > 0) {
                    const fetchedUsers: User[] = res.data;
                    const usersexceptme = fetchedUsers.filter((e) => e.username != username)
                    setFoundUsers(usersexceptme);
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
        <div className='flex flex-col mx-8  sm:my-3 px-auto  [&>*]:py-2 pt-0 md:pt-16 dark:font-black'>
            <div className='font-semibold text-2xl text-center'>Find User</div>
            <form onSubmit={handleFindUser} className="w-full
            flex" >
                <input type="text" value={search} onChange={handleSearchInputChange} className="flex-grow p-2 rounded-lg focus:outline-0 focus:border-primary-700 active:border-primary-600" />
                {/* <button onClick={() => console.log("fetching the users")} className="mx-3 border rounded-lg px-2" >Find user</button> */}
            </form>
            {
                foundusers.length > 0 && <div>
                    {foundusers.map((eachuser: User, index) => {
                        return (
                            <NavLink to={`/newchat/${eachuser.username}`} >
                                <div key={index} className="border border-primary-300 font-normal rounded-full px-2 text-center my-1 hover:scale-[1.02] hover:bg-primary-500" >
                                    {eachuser.username}
                                </div>
                            </NavLink>
                        )
                    })}
                </div>
            }
            {
                searchInitialized && foundusers.length === 0 && !loading && <div className='text-center'>
                    No User Found
                </div>
            }
            {
                loading && <div className='text-center'>Loading Users</div>
            }
        </div>
    )
}
export default FindUser