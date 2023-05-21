import { createSlice } from "@reduxjs/toolkit";

const initialCart = {
    iscart : false,
    Notification : null,
}

const cartSlicer = createSlice({
    name : 'cart',
    initialState : initialCart,
    reducers : {
        showCart (state){
            state.iscart = !state.iscart
        },
        loading (state,action){
            if(action.payload){

                state.Notification = {
                    status : action.payload.status,
                    title : action.payload.title,
                    message : action.payload.message,
                }
            }else{
                state.Notification = null
            }
        }
    }
})
export const cartSlicerAction = cartSlicer.actions;

export default cartSlicer.reducer;