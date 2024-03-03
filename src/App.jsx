import React, { useContext, useEffect } from 'react'
import Navbar from './Component/Navbar/Navbar'

import Layout from './Component/Layout/Layout'
import Cart from './Component/Cart/Cart'
import Register from './Component/Register/Register'
import Home from './Component/Home/Home'
import Login from './Component/Login/Login'
import Brand from './Component/Brand/Brand'
import Products from './Component/Products/Products'
import Categories from './Component/Categories/Categories'
import NotFound from './Component/NotFound/NotFound'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import CounterContextProvider from './Context/CounterContext'
import UserContextProvider, { UserContext } from './Context/UserContext'
import ProtectedRoute from './Component/ProtectedRoute/ProtectedRoute'
import ProductDetails from './Component/ProductDetails/ProductDetails'
import toast, { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux'
import { store } from './Redux/Store'
import Wishlist from './Component/Wishlist/Wishlist'
import ShippingAddress from './Component/ShippingAddress/ShippingAddress'
import AllOrders from './Component/AllOrders/AllOrders'





export default function App() {










  let routers =createBrowserRouter([
    {path:'' , element:<Layout/> , children : [
      {index:true , element:<ProtectedRoute> <Home/>  </ProtectedRoute>  },
      {path:'Ecommerce-website-Freshcart/' , element:<ProtectedRoute> <Login/>  </ProtectedRoute> },
      {path:'cart' , element:<ProtectedRoute> <Cart/>  </ProtectedRoute> },
      {path:'brands' , element:<ProtectedRoute> <Brand/>  </ProtectedRoute> },
      {path:'allorders' , element:<ProtectedRoute> <Home/>  </ProtectedRoute> },
      {path:'shippingaddress/:cartId' , element:<ProtectedRoute> <ShippingAddress/>  </ProtectedRoute> },
      {path:'products' , element:<ProtectedRoute> <Products/>  </ProtectedRoute> },
      {path:'productdetails/:id' , element:<ProtectedRoute> <ProductDetails/>  </ProtectedRoute> },
      {path:'categories' , element:<ProtectedRoute> <Categories/>  </ProtectedRoute> },
      {path:'wishlist' , element:<ProtectedRoute> <Wishlist/>  </ProtectedRoute> },
      {path:'Register' , element:<Register/>  },
      {path:'login' , element:<Login/>  },
      {path:'*' , element:<NotFound/>  },

    ]}
  ])


  let {setUserToken}=useContext(UserContext);
  useEffect(()=>{

    if(localStorage.getItem('userToken')){
      setUserToken(localStorage.getItem('userToken'))
    }

  } , [])



  return <>
    <CounterContextProvider>
      <Provider store={store}>
        <RouterProvider router={routers}></RouterProvider>
        <Toaster />
      </Provider>

    </CounterContextProvider>

  </>
}
