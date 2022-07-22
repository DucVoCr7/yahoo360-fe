import React, { useState, useEffect } from 'react'
import { userRequest } from '../../utils/requestMethods'
import HeaderOfUser from '../../components/headerOfUser/HeaderOfUser'
import PostsUser from '../../components/postsUser/PostsUser'
import Sidebar from '../../components/sidebar/Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import './home.scss'
import { setFriendsRequest } from '../../redux/userSlice'
export default function Home() {

const dispatch = useDispatch();

const [image, setImage] = useState()
const [posts, setPosts] = useState()
const [postsNumber, setPostsNumber] = useState()
const [photos, setPhotos] = useState()
const [friends, setFriends] = useState()
const [musics, setMusics] = useState()
const [name, setName] = useState()
const [gender, setGender] = useState()
const [position, setPosition] = useState()
const [address, setAddress] = useState()
const userId = useSelector(state=> state.user.userInfo?.id)

useEffect(()=> {
  (async()=> {
    try {
      const response = await userRequest.get(`/homePage/${userId}`)
      console.log(response)
      setImage(response.data.dataUser.image)
      setPosts(response.data.dataUser.posts)
      setPostsNumber(response.data.dataUser.posts.length)
      setPhotos(response.data.dataUser.photos)
      setFriends(response.data.dataUser.friends)
      setMusics(response.data.dataUser.musics)
      setName(response.data.dataUser.name)
      setGender(response.data.dataUser.gender)
      setPosition(response.data.dataUser.position)
      setAddress(response.data.dataUser.address)
      
      dispatch(setFriendsRequest(response.data.dataUser.friendsRequest))

    } catch (error) {
      console.log(error)
    }
  })();
}, [userId])
console.log('re-render:Home')
    return (
      name ? 
        <div className='home'>
          <HeaderOfUser photos={photos} isHomePage={true}/>
          <Sidebar
            image={image}
            postsNumber={postsNumber}
            photos={photos}
            friends={friends}
            musics={musics}
            name={name}
            gender={gender}
            position={position}
            address={address}
            setPhotos={setPhotos}
            setMusics={setMusics}
            isHomePage={true}/>
          <PostsUser posts={posts} isHomePage={true}/>
        </div>
      :
      <div className='home loading'></div>
    )
}