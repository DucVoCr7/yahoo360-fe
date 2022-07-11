import React from 'react'
import Image from '../image/Image'
import Infomation from '../infomation/Infomation'
import Photos from '../photos/Photos'
import Friends from '../friends/Friends'
import Musics from '../musics/Musics'
import './sidebar.scss'

export default function Sidebar({setPhotos, setMusics, image, postsNumber, photos, friends, musics, name, gender, position, address, isHomePage = false}) {
    console.log('re-render: Sidebar')
    return (
        <div className='sidebar'>
            <Image name={name} image={image}/>
            <Infomation 
            postsNumber={postsNumber}
            gender={gender} 
            position = {position}
            address = {address}
            />
            <Photos name={name} photos={photos} setPhotos={setPhotos} isHomePage={isHomePage}/>
            <Friends name={name} friends={friends}/>
            <Musics musics={musics} isHomePage={isHomePage} setMusics={setMusics}/>
        </div>
    )
}