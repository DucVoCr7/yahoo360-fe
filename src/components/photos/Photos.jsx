import React, { useEffect, useRef, useState } from 'react'
import Gallery from 'react-photo-gallery'
import Slider from "react-slick";
import './photos.scss'


function CustomNextArrow(props) {

  const {className, onClick} = props;
  return (
      <div className={className} onClick={onClick}> 
          <i className="bi bi-chevron-right"></i>
      </div>
  )
}

function CustomPrevArrow(props) {
  
  const {className, onClick} = props;
  return (
      <div className={className} onClick={onClick}> 
          <i className="bi bi-chevron-left"></i>
      </div>
  )
}


function Photos({ name, photos, isHomePage = false }) {
  // 
  const photosHiddenNumber = photos.length - 4

  // Gallery
  const photosGallery = photos.map((item, index) => {
    if (index % 2 === 0) return { src: item.photo, height: 3, width: 4 }
    else return { src: item.photo, height: 2, width: 3 }
  })
  const [openGallery, setOpenGallery] = useState(false)


  // SlideShow
  const [openSlider, setOpenSlider] = useState(false)
  const [slideActive, setSlideActive] = useState()
  let refSlider = useRef()
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <CustomNextArrow/>,
    prevArrow: <CustomPrevArrow/>,
    beforeChange: (current, next) => setSlideActive(next + 1),
  }
  const handleOpenSlider = (index)=> {
    setOpenSlider(true)
    setOpenGallery(false)
    refSlider.current.slickGoTo(index)
  }


  return (
    <div className='photos'>
      <title className='photosTitle'>
        <span className="photosTitleContent" onClick={() => setOpenGallery(true)}>
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
            <div className="photosContentItem" key={index} onClick={()=> handleOpenSlider(index)}>
              <img src={item.photo} alt="friendImg" className="photosContentItemImg"/>
              <span className="photosContentItemView">View</span>
            </div>
          ))}
          {photosHiddenNumber > 0 &&
            <span className="photosContentHidden" onClick={() => setOpenGallery(true)}>
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



      {/* Gallery */}
      {openGallery &&
        <div className="photosGallery">
          <div className="photosGalleryTitle">
            {name}'s photos
            <i className="photosGalleryTitleClose bi bi-x" onClick={() => setOpenGallery(false)}></i>
          </div>
          <Gallery photos={photosGallery} onClick={(event, { photo, index })=> handleOpenSlider(index)}/>
        </div>
      }



      {/* SlideShowPhoTo */}
      <div className={openSlider ? "photosSlider active" : "photosSlider"}>
        <div className="photosSliderTitle">
          {name}'s photo
          <span className="photosSliderTitleNumber">
            {slideActive}/{photos.length}
          </span>
          <i className="photosSliderTitleClose bi bi-x" onClick={() => setOpenSlider(false)}></i>
        </div>
        <Slider {...settings} ref={refSlider}>
          {photos.map((element, index) =>
            <img src={element.photo} alt='headerImg' className="photosSliderItem" key={index} />
          )}
        </Slider>
      </div>
    </div>
  )
}

export default Photos