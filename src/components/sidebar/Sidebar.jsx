import React from 'react'
import Infomation from '../infomation/Infomation'
import Photos from '../photos/Photos'
import Friends from '../friends/Friends'
import './sidebar.scss'
import NameMusics from '../nameMusics/NameMusics'
import ActionsFriend from '../actionsFriend/ActionsFriend'

export default function Sidebar({
    name,
    image, 

    id,
    setFriends,
    statusFriend, 
    setStatusFriend, 
    
    gender, 
    position, 
    postsNumber, 
    address, 

    photos, 
    setPhotos, 

    musics, 
    setMusics, 

    friends, 

    isHomePage = false}) {
    let elementRenderNumber
    if(window.innerWidth > 900) {
        elementRenderNumber = 8
    } else if(window.innerWidth < 740) {
        elementRenderNumber = 4
    } else {
        elementRenderNumber = 6
    }
    console.log('re-render: Sidebar')
    return (
        <div className='sidebar'>
            <div className="sidebarTop">
                <div className="sidebarTopLeft">
                    <img src={image} alt="userImage" className="sidebarTopLeftImg"/>
                </div>
                <div className="sidebarTopRight">
                    <div className="sidebarTopRightTop">
                        <NameMusics 
                            name={name} 
                            musics={musics}
                            setMusics={setMusics}
                            isHomePage={isHomePage}
                        />
                        <ActionsFriend
                            id={id}
                            friends={friends}
                            setFriends={setFriends}
                            statusFriend={statusFriend}
                            setStatusFriend={setStatusFriend}
                        />
                    </div>
                    <div className="sidebarTopRightBottom">
                        <Infomation
                            gender={gender} 
                            position = {position}
                            postsNumber={postsNumber}
                            address = {address}
                        />
                    </div>
                </div>
            </div>
            <div className="sidebarBottom">
                <Photos 
                    name={name} 
                    photos={photos} 
                    setPhotos={setPhotos}
                    elementRenderNumber={elementRenderNumber} 
                    isHomePage={isHomePage}/>
                <Friends 
                    name={name} 
                    elementRenderNumber={elementRenderNumber} 
                    friends={friends}
                />
            </div>
        </div>
    )
}