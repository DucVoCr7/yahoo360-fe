import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './register.scss'

export default function Register() {

  const [userInfo, setUserInfo] = useState()
  const [error, setError] = useState()

  const handleChange = (event) => { setUserInfo({ ...userInfo, [event.target.name]: event.target.value }) }
  const handleSubmit = (event) => {
    event.preventDefault()
    //
  }
  return (
    <div className='register'>
      <form className="registerForm" onSubmit={handleSubmit}>
        <div className="registerFormTitle">
          Yahoo! 360°
        </div>
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
        <button className='registerSubmit' type='submit'>Register</button>
        <div className="registerRules">
          Signing up signifies that you have read and agree to the&nbsp;
          <Link to='/about' className='registerRulesLink'>Terms of Service</Link>&nbsp;
          and our&nbsp;
          <Link to='/about' className='registerRulesLink'>Privacy Policy</Link>.
        </div>
      </form>
    </div>
  )
}