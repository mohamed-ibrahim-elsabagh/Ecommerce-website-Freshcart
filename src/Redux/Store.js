import { configureStore } from "@reduxjs/toolkit";
import { CounterReducer } from "./CounterSlide";
import { brandsReducer } from "./BrandSlice";


// store waiting the reducer 
export let store = configureStore({

    reducer:{
        counter : CounterReducer ,
        brand : brandsReducer


    }
})