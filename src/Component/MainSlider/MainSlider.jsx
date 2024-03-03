import React from 'react'
import style from './MainSlider.module.css'
import slide1 from '../../Assets/images/slider-image-3.jpeg'
import slide2 from '../../Assets/images/slider-image-2.jpeg'
import slide3 from '../../Assets/images/blog-img-1.jpeg'
import img1 from '../../Assets/images/grocery-banner.png'
import img2 from '../../Assets/images/grocery-banner-2.jpeg'

import Slider from "react-slick";

export default function MainSlider() {

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1 ,
    arrows: false ,
    autoplay :true ,
    autoplaySpeed : 2000 ,
  };

  return <>
    <div className="row mt-5 mb-5 gx-0">
      <div className="col-md-9">
      <Slider {...settings}>
        <img src={slide1} height={400} className='' alt="slide1" />
        <img src={slide2} height={400} className='' alt="slide2" />
        <img src={slide3} height={400} className='' alt="slide3" />
      </Slider>
      </div>
      <div className='col-md-3'>
      <div className='images '>
        <img src={img1} className='w-100' height={200} alt="sliderImg1" />
        <img src={img2} className='w-100' height={200} alt="sliderImg2" />
      </div>

      </div>

    </div>
  </>
}
