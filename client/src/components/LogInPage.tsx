import React, { useState } from 'react'
import Button from './UI/Button'
import Card from './UI/Card'
import classes from './LogInPage.module.css'
import axios from 'axios'
const LogInPage = () => {
    const [error, setError] = useState("")
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [hasAccount, setHasAccount] = useState(true);
    const toggleHasAccount = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        setError("")
        setHasAccount((prev) => {
            return !prev;
        });
    }
    const handleLogIn = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        if (!username && !password) {
            setError("Please enter a username and password")
            return
        }
        if (username.length < 5) {
            setError("Username must be at least 5 characters long")
            return;
        }
        if (password.length < 5) {
            setError("Password must be at least 5 characters long")
            return;
        }
        if (hasAccount) {
            axios.post('http://localhost:3000/users', {
                username: username,
                password: password
            }).then((res) => {
                if (res.data.message === "User Not Found") {
                    setError("Invalid Username or Password")
                } else {
                    console.log("Valid User")
                }
            }
            )
        }
        else {
            // sign up
            axios.post('http://localhost:3000/newuser', {
                username: username,
                password: password
            }).then((res) => {
                if (res.data.message === "User Already Exists") {
                    setError("User Already Exists")
                    console.log(error);
                } else {
                    setHasAccount(true)
                }
            }
            )
        }

    }
    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value)
        setError("")
    }
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
        setError("")
    }

    return (
        <div className={classes.page}>

            <Card>
                <h1>{hasAccount ? "LogIn" : "SignUp"}</h1>
                <form className={classes.form}>
                    <input type="text" minLength={6} placeholder="username" onChange={handleUsernameChange} />
                    <input type="password" minLength={8} placeholder="Password" onChange={handlePasswordChange} />
                    {error && <p className={classes.error}>{error}</p>}
                    <Button onClick={handleLogIn}>{hasAccount ? "LogIn" : "SignUp"}</Button>
                    {hasAccount ? <p>Don't have an Account?</p> : <p>Already have an Account?</p>}
                    {hasAccount ? <button className={classes.btn} onClick={toggleHasAccount}>SignUp</button> : <button className={classes.btn} onClick={toggleHasAccount}>LogIn</button>}
                </form>
            </Card>
        </div>
    )
}

export default LogInPage;