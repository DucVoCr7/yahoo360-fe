import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../../redux/userSlice'
import { publicRequest } from '../../utils/requestMethods'
import './login.scss'
export default function Login() {
  const [userInfo, setUserInfo] = useState()
  const [error, setError] = useState()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleChange = (event) => setUserInfo({ ...userInfo, [event.target.name]: event.target.value })
  const handleFocus = (event) => setError({...error, [event.target.name]: null})
  const handleLogin = async (event) => {
    try {
      event.preventDefault()
      const response = await publicRequest.post('/login', userInfo)
      dispatch(login(response.data))
      navigate('/home')
    } catch (error) {
      setError(error.response.data)
    }
  }
  return (
    <div className='login'>
      <form className='loginForm' onSubmit={handleLogin}>
        <div className="loginLogo">YAHOO 360</div>
        <label className='loginLabel' htmlFor='loginEmail'>
          Email
          {error?.email && <span className='loginError'>{error.email}</span>}
        </label>
        <input className='loginInput' id='loginEmail' type='text' name='email' placeholder='Enter your mail...'
          onChange={handleChange} onFocus={handleFocus}
        />
        <label className='loginLabel' htmlFor='loginPassword'>
          Password
          {error?.password && <span className='loginError'>{error.password}</span>}
        </label>
        <input className='loginInput' id='loginPassword' type='password' name='password' placeholder='Enter your password....'
          onChange={handleChange} onFocus={handleFocus}
        />
        <button className='loginSubmit' type='submit'>LOGIN</button>
        <div className='loginToRegister'>
          New to Yahoo! 360°? <Link to='/register' className='loginToRegisterLink'>REGISTER</Link>
        </div>
      </form>
    </div>
  )
}
