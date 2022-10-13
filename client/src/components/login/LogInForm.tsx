import { useContext, useState } from 'react'
import axios from 'axios'
import { AuthContext } from '../../contexts/AuthContext'
const LogInForm = () => {
    const [errorMessage, setErrorMessage] = useState('')
    const authctx = useContext(AuthContext);
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [hasAccount, setHasAccount] = useState(true);
    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value.trim())
    }
    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }
    const handleformsubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        // console.log(username, password)
        if (hasAccount) {
            axios.post(`${"http://localhost:3000/"}users`, { username, password }).then((res) => {
                console.log(res);
                if (res.status === 204) {
                    // alert("NO USER Found")

                    setErrorMessage("No User Found")
                } else if (res.data.message === 'wrong') {
                    setErrorMessage("Invalid Username or Password")
                    // alert("Invalid Username or Password")
                } else if (res.status === 200) {
                    // console.log("authenticated");
                    authctx.setUserName(username);
                    localStorage.setItem("username", username)
                }
            }).catch((err) => {
                console.log(err);
            })
        } else {
            axios.post(`${"http://localhost:3000/"}newuser`, { username, password }).then((res) => {

                if (res.status === 200) {
                    setErrorMessage("User already Exists")
                } else if (res.status == 201) {
                    console.log("USer Created")
                    authctx.setUserName(username);
                    localStorage.setItem('username', username);

                    // console.log(res.data);
                }
            }).catch((err) => {
                console.log(err);
            })
        }

    }
    const handleHasAccount: React.MouseEventHandler<HTMLButtonElement> = () => {
        setHasAccount((prev) => !prev)
    }
    return (
        <div className='bg-primary-400 p-8 rounded-xl shadow-2xl dark:bg-primary-300 text-primary-800' >
            <form onSubmit={handleformsubmit} >

                <div className='text-3xl  font-semibold  text-center'>{hasAccount ? "Sign In" : "Sign Up"}</div>
                <div className='mt-4'>
                    <div className='w-100'>
                        <div>

                            <label className='mb-6'>UserName</label>
                        </div>
                        <input type="text" className='p-1 rounded-md border-2 w-full
                    focus:border-primary-900 text-primary-600 font-semibold outline-0'value={username} minLength={5} maxLength={15} onChange={handleUsernameChange} />
                    </div>
                    <div className='w-100 mb-2'>
                        <div>
                            <label>Password</label>
                        </div>
                        <input type="password" minLength={5} value={password} className='p-1 rounded-md border-2 
                        tracking-widest w-full
                    focus:border-primary-900 text-primary-600 font-semibold outline-0' onChange={handlePasswordChange} />
                    </div>
                </div>
                <div className='text-red-700 italic font-light text-sm' >{errorMessage}</div>
                <button className='p-2 box-border border-2 hover:text-white border-primary-700 w-full rounded-lg  font-semibold hover:scale-[1.02] hover:bg-primary-500 focus:cursor-wait transition-all'>{hasAccount ? "LogIn" : "SignUp"}</button>
            </form>
            <div className='text-sm' >{hasAccount ? "Don't have an Account? " : "Already have an account? "}<button className='text-lg underline underline-offset-2 pt-1 hover:text-blue-800 visited:text-primary-900 focus:text-primary-900' onClick={handleHasAccount} >{hasAccount ? "Sign Up " : "Sign In"}</button> </div>
        </div>
    )
}

export default LogInForm