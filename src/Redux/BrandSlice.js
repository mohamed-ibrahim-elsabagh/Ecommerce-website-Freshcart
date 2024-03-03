import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let initialState = {brands:[] , isloading:false , error:null}

// createAsyncThunk create api from server  methode by toolkit
export let getBrands = createAsyncThunk('brandsSlice/getBrands' ,
 async ()=>{
    let {data}= await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
    .catch((err)=>console.log(err));
    console.log(data);
    return data.data


 })

let brandsSlice=createSlice({
    name : 'brandsSlice',
    initialState ,

// made extraReducer to make async function 
    extraReducers: (builder)=>{

        builder.addCase( getBrands.pending , (state , action )=>{
            state.isloading = true ; 
            
        })
        builder.addCase( getBrands.fulfilled , (state , action )=>{
            state.brands = action.payload ;
            state.isloading = false ;

        })

    }

})

export let brandsReducer=brandsSlice.reducer