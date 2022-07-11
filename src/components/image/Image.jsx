import React, { memo } from 'react'
import avatar from '../../assets/image/avatar.jpg'
import './image.scss'
function Image({name, image}) {
  console.log('re-render: Image')
  return (
    <div className='image'>
      <img src={image ? image : avatar} alt="userImage" className="imageContent"/>
      <span className="userName">{name}</span>
    </div>
  )
}

export default memo(Image)