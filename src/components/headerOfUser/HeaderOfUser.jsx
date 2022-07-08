import React from 'react'
import './headerOfUser.scss'
import '../../assets/scss/customSlider.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
function HeaderOfUser({ photos, isHomePage = false }) {
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: photos.length > 4 ? 3 : 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 10000
    };
    return (
        <div className='headerOfUser'>
            {photos.length === 0 ?
                <div className="headerOfUserNoPhoto">
                    {
                        isHomePage ?
                            <label className='headerOfUserNoPhotoIcon' htmlFor="headerOfUserNoPhoto">
                                Add <br /> photo
                                <i className="headerOfUserNoPhotoIconChild bi bi-image"></i>
                                <i className="headerOfUserNoPhotoIconChild bi bi-plus-circle"></i>
                            </label>
                            :
                            <div className="headerOfUserNoPhotoContent">
                                Photos have not been added yet!
                            </div>
                    }
                    <input type="file" id="headerOfUserNoPhoto" hidden />
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

export default HeaderOfUser