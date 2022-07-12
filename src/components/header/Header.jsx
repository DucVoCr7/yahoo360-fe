import React from 'react'
import './header.scss'
import Slider from 'react-slick';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import slideShow from '../../utils/constArrayImg';
function Header() {
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
          <Link to='/' className="headerLogo">YAHOO 360</Link>
          <div className="headerTitle">Store the experience your way!</div>
          <Slider {...settings}>
            {slideShow.map((item, index)=> 
                <img src={item.img} alt='headerImg' className="headerSlide" key={index}/>
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
export default Header