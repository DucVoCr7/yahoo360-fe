import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { userRequest } from '../../utils/requestMethods'
import './home.scss'

export default function Home() {

const [dataUser, setDataUser] = useState()
const user = useSelector(state=> state.user)
useEffect(()=> {
  (async()=> {
    try {
      const response = await userRequest.get(`/api/homeUserPage/${user.id}`)
      setDataUser(response.data)
    } catch (error) {
      console.log(error)
    }

  })();
}, [])
    return (
        <div className={dataUser ? 'home' : 'home loading'}>
          hello
        </div>
    )
}