import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './customSlider.scss'

export function CustomNextArrow(props) {

    const {className, onClick} = props;
    return (
        <div className={className} onClick={onClick}> 
            <i className="customArrow fa-solid fa-angle-right"></i> 
        </div>
    )
}

export function CustomPrevArrow(props) {
    
    const {className, onClick} = props;
    return (
        <div className={className} onClick={onClick}> 
            <i className="customArrow fa-solid fa-angle-left"></i>
        </div>
    )
}