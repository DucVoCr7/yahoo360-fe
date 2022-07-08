import React from 'react'
import Image from '../image/Image'
import Infomation from '../infomation/Infomation'
import Photos from '../photos/Photos'
import Friends from '../friends/Friends'
import Musics from '../musics/Musics'
import './sidebar.scss'

export default function Sidebar({user, isHomePage = false}) {
    console.log(user)
    return (
        <div className='sidebar'>
            <Image image={user.image}/>
            <Infomation 
            name={user.name} 
            gender={user.gender} 
            position = {user.position}
            postsNumber = {user.posts.length}
            address = {user.address}
            />
            <Photos name={user.name} photos={user.photos} isHomePage={isHomePage}/>
            <Friends friends={user.friends} isHomePage={isHomePage}/>
            <Musics musics={user.musics} isHomePage={isHomePage}/>
        </div>
    )
}