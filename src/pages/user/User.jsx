import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import HeaderOfUser from '../../components/headerOfUser/HeaderOfUser'
import PostsUser from '../../components/postsUser/PostsUser'
import Sidebar from '../../components/sidebar/Sidebar'
import { publicRequest } from '../../utils/requestMethods'
import checkStatusFriend from '../../utils/checkStatusFriend'
import './user.scss'
import { useReduxUserFriendRequestReceiveds, useReduxUserFriendRequestSents, useReduxUserId } from '../../utils/reduxMethods'

export default function User() {

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
  const [id, setId] = useState()


  const userId = useReduxUserId()
  const userFriendRequestReceiveds = useReduxUserFriendRequestReceiveds()
  const userFriendRequestSents = useReduxUserFriendRequestSents()

  const [statusFriend, setStatusFriend] = useState()

  const navigate = useNavigate()
  const params = useParams()

  useEffect(() => {
    if (userId == params.userId) {navigate('/home')} else {
      (async () => {
        try {
          const response = await publicRequest.get(`/userPage/${params.userId}`)
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
          setFriends(response.data.dataUser.friends)
          setId(response.data.dataUser.id)

          setStatusFriend(checkStatusFriend(
            response.data.dataUser.id,
            response.data.dataUser.friends,
            userId,
            userFriendRequestReceiveds,
            userFriendRequestSents
          ))
  
        } catch (error) {
          console.log(error)
        }
      })();
    }
  }, [params.userId])
  console.log('re-render:User')
  return (
    name ?
        <div className='user'>
          <HeaderOfUser 
            photos={photos}
          />
          <Sidebar
            name={name}
            image={image}

            id={id}
            setFriends={setFriends}
            statusFriend={statusFriend}
            setStatusFriend={setStatusFriend}
            gender={gender}
            position={position}
            postsNumber={postsNumber}
            address={address}

            photos={photos}
            friends={friends}
            musics={musics}
            />
          <PostsUser 
            posts={posts} 
          />
        </div>
      :
      <div className='user loading'></div>
  )
}