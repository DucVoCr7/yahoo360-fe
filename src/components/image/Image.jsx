import React, { memo } from 'react'
import avatar from '../../assets/image/avatar.jpg'
import './image.scss'
function Image({name, image}) {
  console.log('re-render: Image')
  return (
    <div className='image'>
      <div className="imageTop">
        <img src={image ? image : avatar} alt="userImage" className="imageTopImg"/>
      </div>
      <div className="imageBottom">
        <div className="imageBottomName">
          {name}
        </div>
      </div>
    </div>
  )
}

export default memo(Image)