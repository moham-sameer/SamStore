import { configureStore } from "@reduxjs/toolkit";
import itemsReducer from './ItemsSlice'
import CartReducer from './CartSlice'
const store = configureStore({
    reducer:{
        items:itemsReducer,
        cart:CartReducer,
    }
})

export default store;