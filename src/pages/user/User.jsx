import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import HeaderOfUser from '../../components/headerOfUser/HeaderOfUser'
import PostsOfUser from '../../components/postsOfUser/PostsOfUser'
import Sidebar from '../../components/sidebar/Sidebar'
import { publicRequest } from '../../utils/requestMethods'
import './user.scss'

export default function User() {

  const [dataUser, setDataUser] = useState()
  const params = useParams()
  useEffect(()=> {
    (async()=> {
      try {
        const response = await publicRequest.get(`/userPage/${params.userId}`)
        setDataUser(response.data.dataUser)
      } catch (error) {
        console.log(error)
      }
  
    })();
  }, [])
  console.log(dataUser)
      return (
        dataUser ? 
        <>
          <div className='user'>
            <HeaderOfUser photos={dataUser.photos}/>
            <Sidebar user={dataUser}/>
            <PostsOfUser posts={dataUser.posts}/>
          </div>
        </>
        :
        <div className='user loading'></div>
      )
  }