import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import PostsOfUser from '../../components/postsOfUser/PostsOfUser'
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
      return (
          <div className={dataUser ? 'user' : 'user loading'}>
            {dataUser && <PostsOfUser posts={dataUser.posts}/>}
          </div>
      )
  }