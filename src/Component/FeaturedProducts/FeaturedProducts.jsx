import style from './FeaturedProducts.module.css'
import React, { useContext, useEffect, useState } from 'react'
import { FallingLines } from 'react-loader-spinner'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useQuery } from 'react-query'
import { CartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'
import { WishlistContext } from '../../Context/WishlistContext'
import { NavbarContext } from '../../Context/NavbarContext'

export default function FeaturedProducts() {
    function getproducts(){
      return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    }

    let {data , isLoading , isError , isFetching , refetch} = useQuery('featuredProduct' , getproducts , {});

    let {addToCart, setNumOfCartItems , getCartItems ,plusNumOfCartItems} = useContext(CartContext);

    let {addToWishlist} = useContext(WishlistContext);
   
    const [wishlistStatus, setWishlistStatus] = useState({});

    
    async function postToCart(id){
      let {data}= await addToCart(id)
      if (data.status == 'success'){
        toast.success(data.message);
        plusNumOfCartItems()
      } else {
        toast.error(data.message)
      }

    }

   

    async function postToWishlist(id){
      let {data}= await addToWishlist(id)
      if (data.status === 'success'){
        toast.success(data.message);
        setWishlistStatus(prevState => ({
          ...prevState,
          [id]: true // Update the wishlist status for this product ID
        }));
      } else {
        toast.error(data.message)
      }
    }

    // Fetch cart items and update the number of cart items
    const [cart, setCart] = useState(null);

    async function getItems() {
      let { data } = await getCartItems();
      setCart(data);
    }

    useEffect(() => {
      getItems();
    }, []);

    useEffect(() => {
      if (cart) {
        setNumOfCartItems(cart.data.products.length);
      }
    }, [cart]);

// //////////////////////////////
    const [searchTerm, setSearchTerm] = useState('');

  let filteredData = data?.data.data.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );



    return (
      <>
      <div className='py-5'>
      <input className='form-control mt-4 mb-5' type="text " placeholder="Search" onChange={(event) => { setSearchTerm(event.target.value) }} />

{isLoading ? (
  <div className='row justify-content-center align-items-center vh-100'>
    <FallingLines
      color="#4fa94d"
      width="100"
      visible={true}
      ariaLabel="falling-circles-loading"
    />
  </div>
) : (
  <div className='row gy-4 '>
    {filteredData.map(product =>
      <div className='col-md-3 ' key={product.id}>
        <div className='product p-3 position-relative'>
        <button  onClick={() => postToWishlist(product.id)} className={`loveBtn position-absolute ${style.loveIcon}`}>
            {wishlistStatus[product.id] ? (
              <i className={`fa-solid fa-heart fs-2 text-danger `}></i> // Change color to red if in wishlist
            ) : (
              <i className="fa-solid fa-heart fs-2 "></i>
            )}
          </button>

          <Link to={`/productdetails/${product.id}`}>
            <img src={product.imageCover} className='w-100' alt={product.title} />
            <span className='font-sm text-main'>{product.category.name}</span>
            <h3 className='h5'>{product.title.split(' ').splice(0, 2).join(' ')}</h3>
            <div className='d-flex py-3 justify-content-between align-content-center'>
              <span className='font-sm'>{product.price} EGP</span>
              <span className='font-sm'>
                <i className='fas fa-star rating-color me-1'></i>
                {product.ratingsAverage}
              </span>
            </div>
          </Link>
          <button onClick={() => postToCart(product.id)} className='btn bg-main text-main-light w-100 btn-sm'> Add to Cart</button>

        </div>
      </div>
    )}
  </div>
)}
      </div>


      </>
    );
}
