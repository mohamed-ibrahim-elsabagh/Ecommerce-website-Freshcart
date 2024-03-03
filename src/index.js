import React from 'react';
import ReactDOM from 'react-dom/client';
import'@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import './index.css';
import App from './App.jsx';
import reportWebVitals from './reportWebVitals';
import UserContextProvider from './Context/UserContext.js';
import { QueryClient, QueryClientProvider } from 'react-query';
import {ReactQueryDevtools} from 'react-query/devtools'
import CartContextProvider from './Context/CartContext.js';
import WishlistContextProvider from './Context/WishlistContext.js';


let queryClient = new QueryClient();


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    
    <WishlistContextProvider>
    <CartContextProvider>
        <UserContextProvider>
            <QueryClientProvider client={queryClient}>
                <App />
                <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
            </QueryClientProvider>

        </UserContextProvider>
    </CartContextProvider>
    </WishlistContextProvider>
    

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
