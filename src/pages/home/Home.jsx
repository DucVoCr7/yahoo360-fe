import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { userRequest } from '../../utils/requestMethods'
import './home.scss'
import HeaderOfUser from '../../components/headerOfUser/HeaderOfUser'
import PostsOfUser from '../../components/postsOfUser/PostsOfUser'
import Sidebar from '../../components/sidebar/Sidebar'
export default function Home() {

const [dataUser, setDataUser] = useState()
const {userInfo} = useSelector(state=> state.user)

useEffect(()=> {
  (async()=> {
    try {
      const response = await userRequest.get(`/homePage/${userInfo.id}`)
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
        <div className='home'>
          <HeaderOfUser photos={dataUser.photos} isHomePage={true}/>
          <Sidebar user={dataUser} isHomePage={true}/>
          <PostsOfUser posts={dataUser.posts}/>
        </div>
      </>
      :
      <div className='home loading'></div>
    )
}