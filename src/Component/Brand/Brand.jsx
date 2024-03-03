import React, { useEffect } from 'react'
import style from './Brand.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { getBrands } from '../../Redux/BrandSlice'
import { FallingLines } from 'react-loader-spinner'

export default function Brand() {

  // hygyb al barnd wl counter  al hwa asmo fl store 
  let { brands , isloading }=useSelector(({brand})=> brand)


  let dispatch=useDispatch()

  useEffect(()=>{

    dispatch(getBrands())

  }, [])


  return <>
          {isloading ?
        <div className='loading'>
          <FallingLines
            color="#4fa94d"
            width="100"
            visible={true}
            ariaLabel="falling-circles-loading"
          />
      </div> : <><div className="row py-5">
        {brands.map(brand => 
           <div  key={brand._id} className="col-md-3">
          <div className="product p-2">
            <img src={brand.image} className='w-100' alt={brand.name} />
            {/* <p>{brand.name}</p> */}
          </div>
        </div>)}



      </div>
        </>}
  </>
}
