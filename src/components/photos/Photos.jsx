import React, { useState } from 'react'
import Gallery from 'react-photo-gallery'
import './photos.scss'
function Photos({ name, photos, isHomePage = false }) {
  const photosGallery = photos.map((item, index) => {
    if (index % 2 === 0) return { src: item.photo, height: 3, width: 4 }
    else return { src: item.photo, height: 2, width: 3 }
  })
  const photosHiddenNumber = photos.length - 4
  const [openGallery, setOpenGallery] = useState(false)
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
      {photos.length > 0 ?
        <div className="photosContent">
          {photos.map((item, index) => (
            index < 4 &&
            <div className="photosContentItem" key={item.id}>
              <img src={item.photo} alt="friendImg" className="photosContentItemImg" />
              <span className="photosContentItemView">View</span>
            </div>
          ))}
          {photosHiddenNumber > 0 &&
            <span className="photosContentHidden" onClick={()=> setOpenGallery(true)}>
              +{photosHiddenNumber}
            </span>
          }
        </div>
        :
        <div className="photosNoContent">
          {isHomePage ?
              <div className='photosNoContentIcon'>
                Add <br /> photo
                <i className="photosNoContentIconChild bi bi bi-image"></i>
                <i className="photosNoContentIconChild  bi bi-plus-circle"></i>
              </div>
              :
              <div className="photosNoContentContent">
                Photo have not been added yet!
              </div>
          }
        </div>
      }
      {openGallery &&
        <div className="photosGallery">
          <div className="photosGalleryTitle">
            {name}'s photos
            <i className="photosGalleryTitleClose bi bi-x" onClick={()=> setOpenGallery(false)}></i>
          </div>
          <Gallery photos={photosGallery} />
        </div>
      }
    </div>
  )
}

export default Photos