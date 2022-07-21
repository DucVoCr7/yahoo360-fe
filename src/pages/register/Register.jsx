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
    const statusRegister = await dispatch(register(userInfo)) 
    if(!statusRegister.error) {
      navigate('/home')
    }
  }
  return (
    <div className='register'>
      <form className="registerForm" onSubmit={handleSubmit}>
      <div className="registerLogo">YAHOO 360</div>
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
        <div className="registerRules">
        Learn about&nbsp;
          <Link to='/about' className='registerRulesLink'>Terms of Service</Link>&nbsp;
          & &nbsp;
          <Link to='/about' className='registerRulesLink'>Privacy Policy</Link>.
        </div>
      </form>
    </div>
  )
}
