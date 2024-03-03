import React from 'react'
import style from './Layout.module.css'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'
import { Offline, Online } from "react-detect-offline";
import {Helmet} from "react-helmet";


export default function Layout() {
  return <>
    <Navbar/>
    <div className='container py-5 '>

      <Helmet>
        <meta charSet="utf-8" />
        <title>Fresh Cart</title>
        
      </Helmet>

      <Offline>
        <div className="loading">
          <p className='p-5 bg-danger text-light fw-bold rounded-3 h3 '> <i class="fa-solid fa-ban teaxt-danger"></i> No Internet Connection</p>
        </div>
      </Offline>
      <div className='layoutMargTop'>
      <Outlet></Outlet>
      </div>


    </div>
    <Footer />
  </>
}
