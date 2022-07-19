import React, { useEffect, useRef, useState } from 'react'
import { memo } from 'react';
import Gallery from 'react-photo-gallery'
import { useSelector } from 'react-redux';
import Slider from "react-slick";
import { userRequest } from '../../utils/requestMethods';
import empty from '../../assets/image/empty.png'
import './photos.scss'


function CustomNextArrow(props) {

  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <i className="bi bi-chevron-right"></i>
    </div>
  )
}

function CustomPrevArrow(props) {

  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <i className="bi bi-chevron-left"></i>
    </div>
  )
}


function Photos({ setPhotos, name, photos, isHomePage = false }) {

  const photosHiddenNumber = photos.length - 4
  const [file, setFile] = useState()

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
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    beforeChange: (current, next) => setSlideActive(next + 1),
  }
  const handleOpenSlider = (index) => {
    setOpenSlider(true)
    setOpenGallery(false)
    refSlider.current.slickGoTo(index)
  }



  // UploadFile
  const userId = useSelector(state => state.user.userInfo?.id)
  const handleSetFile = (event) => {
    const file = event.target.files[0]
    file.preview = URL.createObjectURL(file)
    setFile(file)
  }
  useEffect(() => {
    (async () => {
      if (file) {
        const formData = new FormData()
        formData.append('photo', file)
        formData.append('userId', userId)
        try {
          const response = await userRequest.post('/photos', formData)
          setPhotos([response.data.photo, ...photos])
        } catch (error) {
          console.log(error)
        }
      }
    })()
    return () => file && URL.revokeObjectURL(file.preview)
  }, [file])

  console.log('re-render: Photos')
  return (
    <div className='photos'>
      <title className='photosTitle'>
        <span className="photosTitleContent" onClick={() => setOpenGallery(true)}>
          <i className="photosTitleContentIcon bi bi-camera-fill"></i>
          PHOTOS ({photos.length})
        </span>
        {isHomePage &&
          <>
            <label className="photosTitleAdd" htmlFor='photosId'>
              <i className="photosTitleAddIcon bi bi-plus"></i>
              <i className="photosTitleAddIcon bi bi-card-image"></i>
            </label>
            <input type="file" id="photosId" hidden onChange={handleSetFile} />
          </>
        }
      </title>
      {photos.length > 0 ?
        <div className="photosContent">
          {photos.map((item, index) => (
            index < 4 &&
            <div className="photosContentItem" key={index} onClick={() => handleOpenSlider(index)}>
              <img src={item.photo} alt="friendImg" className="photosContentItemImg" />
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
            <label className="photosNoContentContent" htmlFor='photosId'>
              <img src={empty} alt='emptyIcon' className="photosNoContentContentIcon"/>
            </label>
            :
            <div className="photosNoContentContent">
              <img src={empty} alt='emptyIcon' className="photosNoContentContentIcon"/>
            </div>
          }
        </div>
      }



      {/* Gallery */}
      {openGallery &&
        <div className="photosGallery">
          <div className="photosGalleryTitle">
            {name}'s photos
            <i className="photosGalleryTitleClose bi bi-box-arrow-right" onClick={() => setOpenGallery(false)}></i>
          </div>
          <Gallery photos={photosGallery} onClick={(event, { photo, index }) => handleOpenSlider(index)} />
        </div>
      }



      {/* SlideShowPhoTo */}
      <div className={openSlider ? "photosSlider active" : "photosSlider"}>
        <div className="photosSliderTitle">
          {name}'s photo
          <span className="photosSliderTitleNumber">
            {slideActive}/{photos.length}
          </span>
          <i className="photosSliderTitleClose bi bi-box-arrow-right" onClick={() => setOpenSlider(false)}></i>
        </div>
        <div className="photosSliderContent">
          <Slider {...settings} ref={refSlider}>
            {photos.map((element, index) =>
              <div className="photosSliderContentSlide">
                <img src={element.photo} alt='SlideImg' className="photosSliderContentSlideImg" key={index} />
              </div>
            )}
          </Slider>
        </div>
      </div>
    </div>
  )
}

export default memo(Photos) 