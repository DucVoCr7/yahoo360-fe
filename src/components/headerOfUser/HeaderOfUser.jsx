import React, { memo }  from 'react'
import Slider from 'react-slick';
import empty from '../../assets/image/empty.png'
import './headerOfUser.scss'

function HeaderOfUser({ 
    photos, 
    isHomePage = false 
}) {

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 10000
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