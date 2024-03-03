import React, { useState } from 'react'
import style from './Register.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { FallingLines } from 'react-loader-spinner'
import { Link, useNavigate } from 'react-router-dom'


export default function Register() {

  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState(null)

  let navigate = useNavigate()

  async function registerSubmit(values){
    setLoading(true)
    let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
    .catch((err)=>{ 
      setApiError(err.response.data.message)
      setLoading(false)
     })

    if(data.message == 'success'){
      setLoading(false)
      navigate('/Login')
    }


  }




  let validationSchema= Yup.object({
    name : Yup.string().required('Name is required').min(3 , 'min length is 3').max(10 , 'max length is 10'),
    email : Yup.string().required('Email is required').email('invalid Email'),
    password : Yup.string().required('Password is required').matches(/^[A-Z][\w @]{5,8}$/ , 'invalid Password  ex"Ahmed123" '),
    rePassword : Yup.string().required('rePassword is required').oneOf([ Yup.ref('password') ] , 'password and rePassword dont match' ),
    phone: Yup.string().required('Password is required').matches(/^01[0125][0-9]{8}$/ , 'put Egyption Number'),

  })


 



  let formik =  useFormik({
    initialValues:{
      name: '',
      email:'',
      password:'',
      rePassword:'',
      phone:''
  }, validationSchema
  ,onSubmit:registerSubmit    // by default onSubmit send toregister function .values 


  })



  return <>
  <div className="75 mx-auto py-4">
    <h2>Register Now</h2>
    <form onSubmit={formik.handleSubmit}>

      {apiError?<div className="alert alert-danger">{apiError}</div>:''}


      <label htmlFor="name">Name</label>
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" id='name' name='name' className='form-control mb-3' />
      {formik.errors.name && formik.touched.name?<div className='alert alert-danger py-2'>{formik.errors.name}</div>:''}
      
      <label htmlFor="email">Email</label>
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="email" id='email' name='email' className='form-control mb-3' />
      {formik.errors.email && formik.touched.email?<div className='alert alert-danger py-2'>{formik.errors.email}</div>:''}

      <label htmlFor="password">password</label>
      <input onBlur={formik.handleBlur} onChange={formik.handleChange}  type="password" id='password' name='password' className='form-control mb-3' />
      {formik.errors.password && formik.touched.password?<div className='alert alert-danger py-2'>{formik.errors.password}</div>:''}
      
      <label htmlFor="rePassword">rePassword</label>
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" id='rePassword' name='rePassword' className='form-control mb-3' />
      {formik.errors.rePassword && formik.touched.rePassword?<div className='alert alert-danger py-2'>{formik.errors.rePassword}</div>:''}

      <label htmlFor="phone">phone</label>
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="tel" id='phone' name='phone' className='form-control mb-3' />
      {formik.errors.phone && formik.touched.phone?<div className='alert alert-danger py-2'>{formik.errors.phone}</div>:''}

        {loading ? <button type='button' className='btn text-light mx-2'>
          <FallingLines
            color="#4fa94d"
            width="100"
            visible={true}
            ariaLabel="falling-circles-loading"
          />
        </button> : <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-light'>Register</button>}
        <Link className='mx-2 btn bg-warning text-light ' to={'/login'}>login</Link>




    </form>


  </div>
  </>
}
