import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { FallingLines } from 'react-loader-spinner';
import toast from 'react-hot-toast';
import { WishlistContext } from '../../Context/WishlistContext';
import { CartContext } from '../../Context/CartContext';
import style from './Wishlist.module.css';

export default function Wishlist() {
  const { getWishlistItems, deleteWishlistItem } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);
  const [wishlist, setWishlist] = useState(null);
  const [loading, setLoading] = useState(true);

  async function getItems() {
    let { data } = await getWishlistItems();
    setWishlist(data);
    setLoading(false);
  }

  async function deleteWishlist(id) {
    setLoading(true);
    await deleteWishlistItem(id);

    const updatedWishlist = wishlist.data.filter(item => item._id !== id);
    setWishlist({ data: updatedWishlist });
    setLoading(false);
  }

  let { plusNumOfCartItems} = useContext(CartContext);
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
    getItems();
  }, []);

  return (
    <div className='bg-main-light p-3 mt-5'>
      {loading ? (
        <div className='loading'>
          <FallingLines
            color='#4fa94d'
            width='100'
            visible={true}
            ariaLabel='falling-circles-loading'
          />
        </div>
      ) : wishlist && wishlist.data.length > 0 ? (
        wishlist.data.map(product => (
          <div key={product._id} className='row p-2 m-0 border-bottom border-1 my-3'>
            <div className='col-md-2 my-3'>
              <div className='img'>
                <img src={product.imageCover} className='w-100' alt={product.title} />
              </div>
            </div>
            <div className='col-md-7 my-auto '>
              <p className='text-black fw-bolder'>{product.title}</p>
              <p className='text-main fw-bolder'> price {product.price} EGP</p>
              <button onClick={() => deleteWishlist(product._id)} className='btn btn-danger'>
              <i className='fas fa-trash-can text-white '></i> remove
              </button>
              <button onClick={() => postToCart(product._id)} className='btn bg-main mx-3 text-light'>
                Add to cart
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className={`${style.emptyWishlist} d-flex justify-content-center align-items-center`}>
          <p className='p-5 bg-danger fw-bold text-white rounded-2'>Your wishlist is empty</p>
        </div>
      )}
    </div>
  );
}
