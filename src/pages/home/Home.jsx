import React, { useState, useEffect } from 'react'
import { userRequest } from '../../utils/requestMethods'
import HeaderOfUser from '../../components/headerOfUser/HeaderOfUser'
import PostsUser from '../../components/postsUser/PostsUser'
import Sidebar from '../../components/sidebar/Sidebar'
import './home.scss'
import { useReduxUserId } from '../../utils/reduxMethods'
import { useDispatch } from 'react-redux'
import { setFriendRequestReceiveds, setFriendRequestSents } from '../../redux/userSlice'
export default function Home() {

const dispatch = useDispatch()
const userId = useReduxUserId()

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

useEffect(()=> {
  (async()=> {
    try {
      const response = await userRequest.get(`/homePage/${userId}`)
      console.log(response.data)
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

      dispatch(setFriendRequestReceiveds(response.data.dataUser.friendRequestReceiveds))
      dispatch(setFriendRequestSents(response.data.dataUser.friendRequestSents))

    } catch (error) {
      console.log(error)
    }
  })();
}, [userId])
console.log('re-render:Home')
    return (
      name ? 
        <div className='home'>
          <HeaderOfUser 
            photos={photos} 
            isHomePage={true}
          />
          <Sidebar
            image={image}
            name={name}

            gender={gender}
            position={position}
            postsNumber={postsNumber}
            address={address}

            photos={photos}
            setPhotos={setPhotos}
            friends={friends}
            musics={musics}
            setMusics={setMusics}
            isHomePage={true}
          />
          <PostsUser
           posts={posts} 
           isHomePage={true}
          />
        </div>
      :
      <div className='home loading'></div>
    )
}