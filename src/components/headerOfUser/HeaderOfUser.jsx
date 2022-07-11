import React from 'react'
import './headerOfUser.scss'
import Slider from 'react-slick';
import { memo } from 'react';
function HeaderOfUser({ photos, isHomePage = false }) {
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 10000
    };
    console.log('re-render: HeaderOfUser')
    return (
        <div className='headerOfUser'>
            {photos.length === 0 ?
                <div className="headerOfUserNoPhoto">
                    {
                        isHomePage ?
                            <label className='headerOfUserNoPhotoIcon' htmlFor='photosId'>
                                Add <br /> photo
                                <i className="headerOfUserNoPhotoIconChild bi bi-image"></i>
                                <i className="headerOfUserNoPhotoIconChild bi bi-plus-circle"></i>
                            </label>
                            :
                            <div className="headerOfUserNoPhotoContent">
                                Photos have not been added yet!
                            </div>
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