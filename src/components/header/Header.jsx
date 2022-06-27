import React from 'react'
import './header.scss'
import Slider from 'react-slick/lib/slider'
import { CustomNextArrow, CustomPrevArrow } from '../customSlider/CustomSlider'
import style from '../../assets/image/style.jpg'
import travel from '../../assets/image/travel.jpg'
import tech from '../../assets/image/tech.jpg'
import cenima from '../../assets/image/cenima.jpg'
import food from '../../assets/image/food.jpg'
import life from '../../assets/image/life.jpg'
import music from '../../assets/image/music.jpg'
import sport from '../../assets/image/sport.jpg'
export default function Header() {
    const slideShow = [
      { img: life, content: 'Life' },
      { img: style, content: 'Style' },
      { img: travel, content: 'Travel' },
      { img: tech, content: 'Tech' },
      { img: cenima, content: 'Cenima' },
      { img: food, content: 'Food' },
      { img: music, content: 'Music' },
      { img: sport, content: 'Sport' },
    ]
    const settings = {
      dots: true,
      fade: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 10000
    };
    return (
        <div className='header'>
          <div className="headerLogo">YAHOO 360</div>
          <div className="headerTitle">Store the experience your way!</div>
          <Slider {...settings}>
            {slideShow.map((slide, index)=> 
              <div className="headerSlide" key={index}>
                <img src={slide.img} alt='headerImg' className="headerSlideImg" />
                <div className="headerSlideContent">{slide.content}</div>
              </div>
            )}
          </Slider>
        </div>
    )
}