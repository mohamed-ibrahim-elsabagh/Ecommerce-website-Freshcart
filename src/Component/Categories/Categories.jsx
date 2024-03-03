import React, { useContext, useEffect, useState } from 'react'
import style from './Categories.module.css'
import toast from 'react-hot-toast';
import axios from 'axios';



import { FallingLines, Watch } from 'react-loader-spinner';
import { Helmet } from 'react-helmet';

export default function Categories() {


   const [categories, setcategories] = useState([])
   const [loading, setloading] = useState(true)

   async function getcategories() {
   let {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
   setcategories(data.data)
   setloading(false)
   }
   useEffect(()=>{
    getcategories()
   },[])








  return <>
  

  {loading ? <div className="row">

  <div className='loading'>
          <FallingLines color='#4fa94d' width='100' visible={true} ariaLabel='falling-circles-loading' />
        </div>
  </div>
      : <>
        <div className='row p-5'>
          {categories.map((product, index) =>
            <div className='col-md-4' key={`${product.id}_${index}`}>
              <div className="product p-2 m-3">
                <img src={product.image} height={300} width={300} alt={product.title} className='w-100 rounded-2' />
                <span className='font-sm text-main fw-bold '>  {product.name} </span>

              </div>

            </div>

          )}
        </div>

      </>

    }


</>
}