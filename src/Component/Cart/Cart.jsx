import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../Context/CartContext';
import { FallingLines } from 'react-loader-spinner';
import style from './Cart.module.css';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { getCartItems, deleteCartItem, UpdateCartItem, clearCart , numOfCartItems , setNumOfCartItems  } = useContext(CartContext);
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  async function getItems() {
    let { data } = await getCartItems();
    setCart(data);
    setLoading(false);
  }

  async function deleteItem(id) {
    setLoading(true);
    let { data } = await deleteCartItem(id);
    setCart(data);
    setLoading(false);
  }

  async function updateCart(id, count) {
    if (count < 1) {
      let { data } = await deleteCartItem(id);
      setCart(data);
    } else {
      let { data } = await UpdateCartItem(id, count);
      setCart(data);
    }
  }

  async function handleClearCart() {
    setLoading(true); // Set loading state to true to indicate that the cart is being cleared
    await clearCart(); // Call the clearCart function provided by the CartContext to clear all products from the cart
    setCart({ data: { products: [] } }); // Update the cart state to reflect that the cart is empty
    setLoading(false); // Set loading state to false after the cart is cleared
  }

  useEffect(() => {
    getItems();
  }, []);

  useEffect(() => {
    // Update numOfCartItems whenever cart changes
    if (cart) {
      setNumOfCartItems(cart.data.products.length);
    }
  }, [cart]);



  return (
    <div className='bg-main-light p-3 mt-5'>
      {loading ? (
        <div className='loading'>
          <FallingLines color='#4fa94d' width='100' visible={true} ariaLabel='falling-circles-loading' />
        </div>
      ) : cart && cart.data.products.length > 0 ? (
        <>
        <div className='d-flex justify-content-center align-items-center '>
        <p className='text-main p-3 bg-white rounded-2 fw-bold mx-2'>numOfCartItems: {cart?.numOfCartItems}</p>
          <p className='text-main p-3 bg-white rounded-2 fw-bold mx-2'>totalCartPrice: {cart?.data.totalCartPrice}</p>
        </div>
        <div className='d-flex justify-content-center align-content-center'>
          <Link to={`/shippingaddress/${cart.data._id}`} className='btn bg-main  text-white fw-bold px-5 '> <i className="fa-solid fa-sack-dollar mx-1"></i> Checkout </Link>

        </div>



          {cart.data.products.map((product , index) => (
            <div key={`${product.product.id}_${index}`} className='row p-2 m-0 border-bottom border-1'>
              <div className='col-md-2'>
                <div className='img'>
                  <img src={product.product.imageCover} className='w-100' alt={product.product.title} />
                </div>
              </div>
              <div className='col-md-7 my-auto'>
                <div className='item'>
                  <h3 className='h6 fw-bold '>{product.product.title.split(' ').slice(0, 3).join(' ')}</h3>
                  <p className='text-main fw-bold'>Price:{product.price} EGP</p>
                  <button onClick={() => deleteItem(product.product.id)} className='btn text-main bg-body-tertiary shadow'>
                    <i className='fas fa-trash-can text-danger'></i> Remove
                  </button>
                </div>
              </div>
              <div className='col-md-1 my-auto'>
                <div className='count p-3'>
                  <button onClick={() => updateCart(product.product.id, product.count + 1)} className='btn p-1 brdr'>
                    +
                  </button>
                  <span className='mx-2'>{product.count}</span>
                  <button onClick={() => updateCart(product.product.id, product.count - 1)} className='btn p-1 brdr'>
                    -
                  </button>
                </div>
              </div>
            </div>
          ))}
          {/* Clear Cart Button */}
          <div className='clear'>
            <div className=' d-flex justify-content-center align-items-center'>
              <button onClick={handleClearCart} className={`btn btn-danger ${style.clearCartButton} m-4 px-5`}>
                Clear Cart
              </button>
            </div>
          </div>
        </>
      ) : (

        <div className={`${style.emptyCart} d-flex justify-content-center align-items-center`}>
          <p className='p-5 bg-danger fw-bold text-white rounded-2'>Your Cart is empty</p>
        </div>
      )}
    </div>
  );
}
