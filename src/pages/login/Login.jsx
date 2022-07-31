import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../../redux/userSlice'
import './login.scss'
export default function Login() {
  
  const [userInfo, setUserInfo] = useState()
  const dispatch = useDispatch()
  const {error, pending} = useSelector(state => state.user)
  const navigate = useNavigate()

  const handleChange = (event) => setUserInfo({ ...userInfo, [event.target.name]: event.target.value })
  
  const handleLogin = async (event) => {
      event.preventDefault();
      const result = await dispatch(login(userInfo))
      if(!result.error) {
        navigate('/home')
      }
  }

  return (
    <div className='login'>
      <form className='loginForm' onSubmit={handleLogin}>
        <span className="loginLogo">YAHOO 360</span>
        <label className='loginLabel' htmlFor='loginEmail'>
          Email
          {error && <span className='loginError'>{error.email}</span>}
        </label>
        <input className='loginInput' id='loginEmail' type='text' name='email' placeholder='Enter your mail...'
          onChange={handleChange} 
        />
        <label className='loginLabel' htmlFor='loginPassword'>
          Password
          {error && <span className='loginError'>{error.password}</span>}
        </label>
        <input className='loginInput' id='loginPassword' type='password' name='password' placeholder='Enter your password....'
          onChange={handleChange}
        />
        <button className={pending ? 'loginSubmit active btnBig btnMain' : 'loginSubmit btnBig btnMain'}  type='submit'>
          {!pending && 'LOGIN'}
        </button>
        <Link to='/register' className='loginRegister'>New to Yahoo! 360°? REGISTER</Link>
        <Link to='/' className='loginForgot'>You forgot password?</Link>
      </form>
    </div>
  )
}
