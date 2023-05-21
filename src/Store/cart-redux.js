import { createSlice } from "@reduxjs/toolkit";

const initialCart = {
    iscart : false,
}

const cartSlicer = createSlice({
    name : 'cart',
    initialState : initialCart,
    reducers : {
        showCart (state){
            state.iscart = !state.iscart
        }
    }
})
export const cartSlicerAction = cartSlicer.actions;

export default cartSlicer.reducer;