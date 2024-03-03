import style from './Login.module.css'
import React, { useContext, useState } from 'react'

import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { FallingLines } from 'react-loader-spinner'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext'


export default function Login() {
  

  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState(null)

  let{setUserToken}=useContext(UserContext)

  let navigate = useNavigate()

  async function loginSubmit(values){
    setLoading(true)
    let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
    .catch((err)=>{ 
      setApiError(err.response.data.message)
      setLoading(false)
     })

    if(data.message == 'success'){
      setLoading(false)
      localStorage.setItem('userToken',data.token)
      setUserToken(data.token)
      navigate('/')
    }


  }




  let validationSchema= Yup.object({
    
    email : Yup.string().required('Email is required').email('invalid Email'),
    password : Yup.string().required('Password is required').matches(/^[A-Z][\w @]{5,8}$/ , 'invalid Password  ex"Ahmed123" '),
    

  })


 



  let formik =  useFormik({
    initialValues:{

      email:'',
      password:'',

  }, validationSchema
  ,onSubmit:loginSubmit    // by default onSubmit send tologin function .values 


  })



  return <>
  <div className="75 mx-auto py-4">
    <h2>login Now</h2>
    <form onSubmit={formik.handleSubmit}>

      {apiError?<div className="alert alert-danger">{apiError}</div>:''}


      
      
      <label htmlFor="email">Email</label>
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="email" id='email' name='email' className='form-control mb-3' />
      {formik.errors.email && formik.touched.email?<div className='alert alert-danger py-2'>{formik.errors.email}</div>:''}

      <label htmlFor="password">password</label>
      <input onBlur={formik.handleBlur} onChange={formik.handleChange}  type="password" id='password' name='password' className='form-control mb-3' />
      {formik.errors.password && formik.touched.password?<div className='alert alert-danger py-2'>{formik.errors.password}</div>:''}
      
    

        {loading ? <button type='button' className='btn text-light mx-2'>
          <FallingLines
            color="#4fa94d"
            width="100"
            visible={true}
            ariaLabel="falling-circles-loading"
          />
        </button> : <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-light'>login</button>}
        <Link className='mx-2 btn bg-warning text-light ' to={'/register'}>register</Link>





    </form>


  </div>
  </>
}
