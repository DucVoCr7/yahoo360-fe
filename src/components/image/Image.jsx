import React from 'react'
import './image.scss'
function Image({image}) {
  return (
    <div className='image'>
      <img src={image} alt="userImage" className="imageContent" />
    </div>
  )
}

export default Image