import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './login.scss'

export default function Login() {

  const [userInfo, setUserInfo] = useState()
  const [error, setError] = useState()
  const handleChange = (event)=> setUserInfo({...userInfo, [event.target.name]: event.target.value})
  const handleLogin = async (event)=> {
    event.preventDefault()
    //
  }

  return (
    <div className='login'>
        <form className="loginForm" onSubmit={handleLogin}>
            <div className="loginFormTitle">
                Yahoo! 360°
            </div>
            <label className='loginLabel' htmlFor="loginEmail">
              Email
              {error?.email && <span className='loginError'>{error.email}</span>}
            </label>
            <input className='loginInput' id='loginEmail' type="text" name='email' placeholder='Enter your mail...' 
              onChange={handleChange}
            />
            <label className='loginLabel' htmlFor="loginPassword">
              Password
              {error?.password && <span className='loginError'>{error.password}</span>}
            </label>
            <input className='loginInput' id='loginPassword' type="password" name='password' placeholder='Enter your password....'
              onChange={handleChange}
            />
            <button className='loginSubmit' type='submit'>Login</button>
            <div className="loginToRegister">
              New to Yahoo! 360°? <Link to='/register' className='loginToRegisterLink'>Register</Link>
            </div>
        </form>
    </div>
  )
}
