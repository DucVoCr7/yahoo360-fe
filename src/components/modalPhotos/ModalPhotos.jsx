import React from 'react'
import './modalPhotos.scss'
function ModalPhotos({photos}) {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
};
  return (
    <div className='modalPhotos'>
      <Slider {...settings}>
          {photos.map((element, index) =>
              <img src={element.photo} alt='headerImg' className="modalPhotosItem" key={index} />
          )}
      </Slider>
    </div>
  )
}

export default ModalPhotos