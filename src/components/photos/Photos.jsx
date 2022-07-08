import React from 'react'
import './photos.scss'
function Photos({photos, isHomePage = false}) {
  const photosHiddenNumber = photos.length - 4
  return (
    <div className='photos'>
        <title className='photosTitle'>
          <span className="photosTitleContent">
            <i className="photosTitleContentIcon bi bi-camera-fill"></i>
             PHOTOS ({photos.length})
          </span>
          {isHomePage && 
          <span className="photosTitleAdd">
            <i className="photosTitleAddIcon bi bi-plus"></i>
            <i className="photosTitleAddIcon bi bi-card-image"></i>
          </span>
          }
        </title>
        <div className="photosContent">
            {photos.map((item, index)=> (
              index < 4 &&
              <div className="photosContentItem"  key={index}>
              <img src={item.photo} alt="friendImg" className="photosContentItemImg"/>
              <span className="photosContentItemView">View</span>
            </div>
            ))}
            {photosHiddenNumber > 0 && <span className="photosContentHidden">+{photosHiddenNumber}</span>}
        </div>
    </div>
  )
}

export default Photos