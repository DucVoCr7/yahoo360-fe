import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import HeaderOfUser from '../../components/headerOfUser/HeaderOfUser'
import PostsSummary from '../../components/postsSummary/PostsSummary'
import Sidebar from '../../components/sidebar/Sidebar'
import { publicRequest } from '../../utils/requestMethods'
import './user.scss'

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
  const params = useParams()
  useEffect(() => {
    (async () => {
      try {
        const response = await publicRequest.get(`/userPage/${params.userId}`)
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
      } catch (error) {
        console.log(error)
      }

    })();
  }, [params.userId])
  console.log('re-render:User')
  return (
    name ?
        <div className='user'>
          <HeaderOfUser photos={photos}/>
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
            />
          <PostsSummary posts={posts} />
        </div>
      :
      <div className='user loading'></div>
  )
}