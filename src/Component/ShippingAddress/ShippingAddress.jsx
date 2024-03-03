import React, { useContext } from 'react'
import style from './ShippingAddress.module.css'
import { useFormik } from 'formik'
import { useParams } from 'react-router-dom'
import { CartContext } from '../../Context/CartContext'


export default function ShippingAddress() {

  let {cartId}=useParams()

  let  {checkOutSeesion} = useContext(CartContext)

  async function checkOut(values){
    let {data}= await checkOutSeesion(cartId , values);
    console.log(data);
    if (data.status == 'success') {
      window.location.href = data.session.url
    }

    
  }
  let formik =useFormik({
    initialValues:{
      details:'',
      phone:'',
      city:'',

    },onSubmit: checkOut
  })



  return <>
    <div className="w-75 mx-auto mt-5">

      <form onSubmit={formik.handleSubmit} >
        <label htmlFor="details fw-bold ">Details</label>
        <input onChange={formik.handleChange} type="text" id='details' name='details' className='form-control mb-3 ' />
        <label htmlFor="details fw-bold ">City</label>
        <input onChange={formik.handleChange} type="text" id='city' name='city' className='form-control mb-3' />
        <label htmlFor="details fw-bold">Phone</label>
        <input onChange={formik.handleChange} type="tel" id='phone' name='phone' className='form-control mb-3' />
        <button className='btn bg-main text-light ' type='submit'>  Checkout </button>
      </form>
    </div>


  </>
}
