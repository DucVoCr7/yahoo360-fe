import React from 'react'
import './image.scss'
import avatar from '../../assets/image/avatar.jpg'
function Image({image}) {
  return (
    <div className='image'>
      <img src={image ? image : avatar} alt="userImage" className="imageContent" />
    </div>
  )
}

export default Image