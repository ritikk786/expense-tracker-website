import { configureStore } from "@reduxjs/toolkit";
import cartSlicerReducer from './cart-redux'
import cartItemSlicerReducer from './cartItem-redux'

const store = configureStore({
    reducer : { cart : cartSlicerReducer, cartItem : cartItemSlicerReducer}
})
export default store;