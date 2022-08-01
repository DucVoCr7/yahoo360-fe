import React, { memo }  from 'react'
import Slider from 'react-slick';
import empty from '../../assets/image/empty.png'
import './headerOfUser.scss'

function HeaderOfUser({ 
    photos, 
    isHomePage = false 
}) {

    const settings = {
        infinite: true,
        slidesToScroll: 1,
        slidesToShow: 3,
        dots: true,
        autoplay: true,
        autoplaySpeed: 10000,
        responsive: [
            {
              breakpoint: 901,
              settings: {
                slidesToShow: 2,
                dots: false
              }
            },
            {
                breakpoint: 740,
                settings: {
                  slidesToShow: 1,
                  dots: false
                }
            }
          ]
    };

    return (
        <div className='headerOfUser'>
            {photos.length === 0 ?
                <div className="headerOfUserNoPhoto">
                    {isHomePage ?
                        <label className="headerOfUserNoPhotoContent" htmlFor='photosId'>
                            <img src={empty} alt='emptyIcon' className="headerOfUserNoPhotoContentIcon active" />
                        </label>
                        :
                        <span className="headerOfUserNoPhotoContent">
                            <img src={empty} alt='emptyIcon' className="headerOfUserNoPhotoContentIcon" />
                        </span>
                    }
                </div>
                :
                <Slider {...settings}>
                    {photos.map((element, index) =>
                        <img src={element.photo} alt='headerImg' className="headerOfUserPhoto" key={index} />
                    )}
                </Slider>
            }
        </div>
    )
}

export default memo(HeaderOfUser)