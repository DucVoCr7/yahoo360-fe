import React, { useEffect, useRef, useState, memo, useCallback } from 'react'
import PhotoAlbum from "react-photo-album";
import Slider from "react-slick";
import { userRequest } from '../../utils/requestMethods';
import empty from '../../assets/image/empty.png'
import { useReduxUserId } from '../../utils/reduxMethods';
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

function Photos({
  setPhotos,
  name,
  photos,
  elementRenderNumber,
  isHomePage = false
}) {

  const photosHiddenNumber = photos.length - elementRenderNumber
  const [file, setFile] = useState()
  const userId = useReduxUserId()

  // Gallery
  const photosGallery = photos.map((item, index) => {
    if (index % 3 === 1) {
      return {
        src: item.photo,
        width: 900,
        height: 800,
        key: item.id
      }
    }
    else if (index % 3 === 2) {
      return {
        src: item.photo,
        width: 1080,
        height: 600,
        key: item.id
      }
    }
    else {
      return {
        src: item.photo,
        width: 1080,
        height: 400,
        key: item.id
      }
    }
  })
  const handleCustomColumn = (containerWidth) => {
    if (containerWidth > 900) {
      return 5;
    } else if (containerWidth < 740) {
      return 3;
    } else {
      return 4;
    }
  }
  const [selectPhoto, setSelectPhoto] = useState(false)
  const [openGallery, setOpenGallery] = useState(false)
  const [idPhotosSelected, setIdPhotosSelected] = useState([])
  const renderPhoto = ({ layout, layoutOptions, imageProps: { alt, style, ...restImageProps } }) => (
    <div className='react-photo-album--photo--wrapper'
      style={{
        boxSizing: "content-box",
        width: style?.width,
      }}
    >
      <img alt={alt} style={{ ...style, width: "100%", padding: 0 }} {...restImageProps} />
    </div>
  )
  const handleCloseGallery = ()=> {
    setOpenGallery(false)
    setSelectPhoto(false)
  }
  const handleOpenGallery = () => {
    setOpenGallery(true)
  } 
  const handleOnSelectPhoto = () => {
    setSelectPhoto(!selectPhoto)
    setIdPhotosSelected([])
    const photosSelected = document.querySelectorAll('.react-photo-album--photo.active')
    photosSelected.forEach(photoSelected => {
      photoSelected.classList.remove('active')
      photoSelected.parentElement.classList.remove('active')
    })
  }
  const handleSelectPhoto = (event, photo) => {
    if (idPhotosSelected.some(idPhoto => idPhoto === photo.key)) {
      const newIdPhotosSelected = idPhotosSelected.filter(idPhoto => idPhoto !== photo.key)
      setIdPhotosSelected(newIdPhotosSelected)
    } else {
      setIdPhotosSelected([...idPhotosSelected, photo.key])
    }
    event.target.classList.toggle('active')
    event.target.parentElement.classList.toggle('active')
  }
  const handleDeletePhotos = useCallback(() => {
    if (idPhotosSelected.length > 0) {
      Promise.all(idPhotosSelected.map(idPhoto => userRequest.delete(`/photos/${idPhoto}`)))
        .then((response) => {
          console.log(response)
          const newPhotos = photos.filter(photo => !idPhotosSelected.includes(photo.id))
          setPhotos(newPhotos)
          setIdPhotosSelected([])
        })
        .catch((error) => {
          console.log(error)
        });
    }
  })

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
    handleCloseGallery()
    refSlider.current.slickGoTo(index)
  }
  const handleCloseSlider =()=> {
    setOpenSlider(false)
  }


  // UploadFile
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
          setFile(null)
        } catch (error) {
          console.log(error)
        }
      }
    })()
    return () => file && URL.revokeObjectURL(file.preview)
  }, [file])

  return (
    <div className='photos'>
      <title className='photosTitle'>
        <span className="photosTitleContent" onClick={handleOpenGallery}>
          <i className="photosTitleContentIcon bi bi-camera-fill"></i>
          PHOTOS ({photos.length})
        </span>
        <span className="photosTitleAction">
          <span className="photosTitleActionSeeAll" onClick={handleOpenGallery}>
            See all...
          </span>
          {isHomePage &&
            <>
              <label className="photosTitleActionAdd" htmlFor='photosId'>
                <i className="photosTitleActionAddIcon bi bi-plus"></i>
                <i className="photosTitleActionAddIcon bi bi-card-image"></i>
              </label>
              <input type="file" id="photosId" hidden onChange={handleSetFile} />
            </>
          }
        </span>
      </title>
      {photos.length > 0 ?
        <div className="photosContent">
          {photos.map((item, index) => (
            index < elementRenderNumber &&
            <div className="photosContentItem" key={index} onClick={() => handleOpenSlider(index)}>
              <img src={item.photo} alt="friendImg" className="photosContentItemImg" />
            </div>
          ))}
          {photosHiddenNumber > 0 &&
            <span className="photosContentHidden" onClick={handleOpenGallery}>
              +{photosHiddenNumber}
            </span>
          }
        </div>
        :
        <div className="photosNoContent">
          {isHomePage ?
            <label className="photosNoContentContent" htmlFor='photosId'>
              <img src={empty} alt='emptyIcon' className="photosNoContentContentIcon active" />
              {/* Active img dung de cusor pointer */}
            </label>
            :
            <span className="photosNoContentContent">
              <img src={empty} alt='emptyIcon' className="photosNoContentContentIcon" />
            </span>
          }
        </div>
      }

      {/* Gallery */}
      {openGallery &&
        <div className="photosGallery">
          <div className="photosGalleryTitle">
            <span className="photosGalleryTitleContent">
              {name}'s photos
            </span>
            {isHomePage &&
              <>
                <span className="photosGalleryTitleCheckBox">
                  <input
                    className="photosGalleryTitleCheckBoxInput"
                    type="checkbox"
                    id="selectPhoto"
                    onChange={handleOnSelectPhoto}
                  />
                  <label className="photosGalleryTitleCheckBoxLabel" htmlFor="selectPhoto"> Select </label>
                </span>
                <i
                  className="photosGalleryTitleTrash bi bi-trash"
                  onClick={handleDeletePhotos}
                />
              </>
            }
            <i className="photosGalleryTitleClose bi bi-x-lg" onClick={handleCloseGallery}></i>
          </div>
          {photos.length > 0 ?
            <PhotoAlbum
              layout="columns"
              columns={handleCustomColumn}
              minColumns={5}
              spacing={5}
              photos={photosGallery}
              renderPhoto={renderPhoto}
              onClick={(event, photo, index) => selectPhoto ? handleSelectPhoto(event, photo) : handleOpenSlider(index)}
            />
            :
            isHomePage ?
              <label className="photosGalleryNoContent" htmlFor='photosId'>
                <img src={empty} alt='emptyIcon' className="photosGalleryNoContentIcon active" />
                {/* Active img dung de cusor pointer */}
              </label>
              :
              <span className="photosGalleryNoContent">
                <img src={empty} alt='emptyIcon' className="photosGalleryNoContentIcon" />
              </span>
          }
        </div>
      }

      {/* SlideShowPhoTo */}
      <div className={openSlider ? "photosSlider active" : "photosSlider"}>
        <div className="photosSliderTitle">
          {name}'s photo
          <span className="photosSliderTitleNumber">
            {slideActive}/{photos.length}
          </span>
          <i className="photosSliderTitleClose bi bi-x-lg" onClick={handleCloseSlider}></i>
        </div>
        <div className="photosSliderContent">
          <Slider {...settings} ref={refSlider}>
            {photos.map((element) =>
              <div className="photosSliderContentSlide" key={element.id}>
                <img src={element.photo} alt='SlideImg' className="photosSliderContentSlideImg" />
              </div>
            )}
          </Slider>
        </div>
      </div>
    </div>
  )
}

export default memo(Photos) 