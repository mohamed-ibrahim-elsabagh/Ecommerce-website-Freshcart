import React, { useContext, useState } from 'react'
import style from './ProductDetails.module.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useEffect } from 'react'
import { FallingLines } from 'react-loader-spinner'
import Products from '../Products/Products'
import {Helmet} from "react-helmet";


import Slider from "react-slick";
import toast from 'react-hot-toast'
import { CartContext } from '../../Context/CartContext'



export default function ProductDetails() {

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1 ,
    arrows: false ,
    autoplay :true ,
    autoplaySpeed : 2000 ,
  };


  const [details, setDetails] = useState([]) 
  const [loading, setLoading] = useState(true)

  let {id} = useParams()

  async function getProductDetails(id) {
    
    let {data}= await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    setDetails(data.data)
    setLoading(false)

  }


  let { plusNumOfCartItems , addToCart ,getCartItems , setNumOfCartItems} = useContext(CartContext);

  async function postToCart(id){
    let {data}= await addToCart(id)
    if (data.status == 'success'){
      toast.success(data.message);
      plusNumOfCartItems()
    } else {
      toast.error(data.message)
    }

  }


  useEffect(() => {
    
    getProductDetails(id)
  }, []);



  return <>

  {loading ? <>      <div className='row justify-content-center align-items-center vh-100'>
        <FallingLines
          color="#4fa94d"
          width="100"
          visible={true}
          ariaLabel="falling-circles-loading"
        />
      </div></>


      : <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{details.title}</title>

        </Helmet>
        <div className='row align-items-center py-5'>
          <div className='col-md-4'>
            <div className='productdetails' >
              <Slider {...settings}>
                {details.images.map((image, index) => <img src={image} className='w-100' key={index} alt={details.title} />)}

              </Slider>

            </div>
          </div>
          <div className='col-md-8'>
            <div className='details '>

              <h3 className='h5'>{details.title}</h3>
              <p className='font-sm py-3'>{details.description}</p>


              <span className='font-sm text-main'>{details.category.name}</span>
              <div className='d-flex py-3 justify-content-between align-content-center'>

                <span className='font-sm'>{details.price} EGP</span>
                <span className='font-sm'>
                  <i className='fas fa-star rating-color me-1'></i>
                  {details.ratingsAverage} </span>


              </div>


              <button onClick={()=>postToCart(id)} className='btn bg-main text-main-light w-100 btn-sm'> Add to Cart</button>

            </div>
          </div>
        </div>
      </>}


  </>
}

