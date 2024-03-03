import axios from "axios";
import { createContext, useState } from "react";




export let CartContext=createContext()
export default function CartContextProvider(props){



    let headers = {
        token : localStorage.getItem('userToken')
    }

    async function addToCart(productId){

        return await axios.post(`https://ecommerce.routemisr.com/api/v1/cart` , {
            productId 
        } , {
            headers
        })

        .then((response)=> response)
        .catch((err)=> err)

    }

    async function getCartItems(){

        return await axios.get(`https://ecommerce.routemisr.com/api/v1/cart` ,  {
            headers 
         })


        
        .then((response)=> response)
        .catch((err)=> err)

    }
    async function deleteCartItem(productId){

        return await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}` ,  {
            headers
        })

        .then((response)=> response)
        .catch((err)=> err)

    }
    async function UpdateCartItem(productId , count){

        return await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}` ,
        {
            count
        } , {
            headers
        })

        .then((response)=> response)
        .catch((err)=> err)

    }

    async function clearCart(){

        return await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart` ,  {
            headers
        })

        .then((response)=> response)
        .catch((err)=> err)

    }

    let [numOfCartItems, setNumOfCartItems] = useState(0);
    function plusNumOfCartItems(){
        setNumOfCartItems(numOfCartItems+=1)
    }


    async function checkOutSeesion(cartId ,shippingAddress){

        return await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000` , {
            shippingAddress 
        } , {
            headers
        })

        .then((response)=> response)
        .catch((err)=> err)

    }



    return <CartContext.Provider value={{addToCart ,getCartItems ,deleteCartItem ,UpdateCartItem , clearCart , numOfCartItems , setNumOfCartItems , plusNumOfCartItems , checkOutSeesion}}>
        {props.children}
    </CartContext.Provider>
}