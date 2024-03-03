import React from 'react';
import style from './CategoriesSlider.module.css';
import axios from 'axios';
import { useQuery } from 'react-query';
import Slider from 'react-slick';

export default function CategoriesSlider() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6, // Default number of slides to show
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1200, // Medium screens
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 992, // Small screens
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768, // Mobile devices
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  function getCategories() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }

  const { data } = useQuery('categories', getCategories);

  return (
    <div className="row mb-5">
      <Slider {...settings}>
        {data?.data.data.map(category => (
          <div key={category._id} className="col-md-2">
            <div className="img">
              <img src={category.image} height={200} className="w-100" alt={category.name} />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
