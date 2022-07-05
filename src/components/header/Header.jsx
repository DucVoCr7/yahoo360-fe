import React from 'react'
import './header.scss'
import '../../assets/scss/customSlider.scss'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick/lib/slider'
import style from '../../assets/image/style.jpg'
import travel from '../../assets/image/travel.jpg'
import tech from '../../assets/image/tech.jpg'
import cenima from '../../assets/image/cenima.jpg'
import food from '../../assets/image/food.jpg'
import life from '../../assets/image/life.jpg'
import music from '../../assets/image/music.jpg'
import sport from '../../assets/image/sport.jpg'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
export default function Header() {
    const slideShow = [
      { img: life },
      { img: style },
      { img: travel },
      { img: tech },
      { img: cenima },
      { img: food },
      { img: music },
      { img: sport },
    ]
    const settings = {
      fade: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 10000
    };
    const {category} = useSelector(state=> state.app)
    return (
        <div className='header'>
          <div className="headerLogo">YAHOO 360</div>
          <div className="headerTitle">Store the experience your way!</div>
          <Slider {...settings}>
            {slideShow.map((slide, index)=> 
                <img src={slide.img} alt='headerImg' className="headerSlide" />
            )}
          </Slider>
          <div className="headerCategory">
              {category.map((item, index)=> (
                <Link to={`/posts?category=${item.key}`} className="headerCategoryItem" key={index}>
                  {item.value}
                </Link>
              ))}
          </div>
        </div>
    )
}