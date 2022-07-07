import React from 'react'
import './photos.scss'
function Photos({photos, isHomePage = false}) {
  const photosHiddenNumber = photos.length - 4
  return (
    <div className='photos'>
        <title className='photosTitle'>
          <i className="photosTitleIcon bi bi-camera-fill"></i>
         PHOTOS ({photos.length})
        </title>
        <div className="photosContent">
            {photos.map((item, index)=> (
              index < 4 &&
              <img src={item.photo} alt="photoItem" className="photosContentItem" key={index}/>
            ))}
            {photosHiddenNumber > 0 && <span className="photosContentHidden">+{photosHiddenNumber}</span>}
        </div>
    </div>
  )
}

export default Photos