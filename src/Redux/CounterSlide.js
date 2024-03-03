import { createSlice } from "@reduxjs/toolkit";

let initialState={count : 0 , userName: ''}

let counterSlice = createSlice({
    name : ' counterSlice' , 
    initialState , 
    reducers :{
        increase : (state )=>{
            state.count +=1
        },
        decrease: (state )=>{
            state.count -=1
            
        },
        increaseByAmount: (state , action)=>{
            console.log(action)
            
            state.count += action.payload
        }
    }    

})

export let CounterReducer = counterSlice.reducer
export let {increase , decrease , increaseByAmount }=counterSlice.actions