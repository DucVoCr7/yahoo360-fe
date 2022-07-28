import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { register } from '../../redux/userSlice'
import './register.scss'

export default function Register() {

  const [userInfo, setUserInfo] = useState()
  const {error, pending} = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleChange = (event) => { setUserInfo({ ...userInfo, [event.target.name]: event.target.value }) }
  const handleSubmit = async (event) => {
    event.preventDefault()
    const result = await dispatch(register(userInfo)) 
    if(!result.error) {
      navigate('/home')
    }
  }
  return (
    <div className='register'>
      <form className="registerForm" onSubmit={handleSubmit}>
      <span className="registerLogo">YAHOO 360</span>
        <label className='registerLabel'>
          Name
          {error?.name && <span className="registerError">{error.name}</span>}
        </label>
        <input className='registerInput' type="text" name='name' placeholder='Enter your name...'
          onChange={handleChange}
        />
        <label className='registerLabel'>
          Email
          {error?.email && <span className="registerError">{error.email}</span>}
        </label>
        <input className='registerInput' type="text" name='email' placeholder='Enter your mail...'
          onChange={handleChange}
        />
        <label className='registerLabel'>
          Password
          {error?.password && <span className="registerError">{error.password}</span>}
        </label>
        <input className='registerInput' type="password" name='password' placeholder='Enter your password....'
          onChange={handleChange}
        />
        <button className={pending ? 'registerSubmit btnBig btnMain active' : 'registerSubmit btnBig btnMain'}  type='submit'>
          {!pending && 'REGISTER'}
        </button>
        <Link to='/' className='registerRules'>Learn about Terms of Service & Privacy Policy</Link>
      </form>
    </div>
  )
}
