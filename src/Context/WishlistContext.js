import axios from "axios";
import { createContext } from "react";



export let WishlistContext=createContext()

 export default function WishlistContextProvider(props){

    
    let headers = {
        token : localStorage.getItem('userToken')
    }
    async function addToWishlist(productId){

        return await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist` , {
            productId 
        } , {
            headers
        })

        .then((response)=> response)
        .catch((err)=> err)

    }
    async function getWishlistItems(){

        return await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist` ,  {
            headers
        })

        .then((response)=> response)
        .catch((err)=> err)

    }
    async function deleteWishlistItem(productId){

        return await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}` ,  {
            headers
        })

        .then((response)=> response)
        .catch((err)=> err)

    }
    async function UpdateWishlistItem(productId , count){

        return await axios.put(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}` ,
        {
            count
        } , {
            headers
        })

        .then((response)=> response)
        .catch((err)=> err)

    }


    return <WishlistContext.Provider value={{addToWishlist ,getWishlistItems ,deleteWishlistItem ,UpdateWishlistItem}}>
    {props.children}
</WishlistContext.Provider>

}