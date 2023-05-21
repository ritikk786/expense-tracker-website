import { createSlice } from "@reduxjs/toolkit";

const initialCartItem = {
    cartItems : [],
    totalcart : 0,
}

const cartItemSlicer = createSlice({
    name : 'cartItem',
    initialState : initialCartItem,
    reducers : {
        addingItem(state,action){
            const newItem = action.payload
            console.log(newItem)
            const existingCart = state.cartItems.find(item => item.id === newItem.id)
            state.totalcart++
            console.log(existingCart)
            if(!existingCart){
                state.cartItems.push({
                    id :newItem.id,
                    title : newItem.title,
                    price : newItem.price,
                    description : newItem.description,
                    quantity : 1,
                    total : newItem.price,
                })
            }
            else{
                existingCart.quantity++
                existingCart.total = existingCart.total + newItem.price
            }
        },
        deleteItem(state,action){
            const itemId = action.payload;
            const existingCart = state.cartItems.find(item => item.id === itemId)
            state.totalcart--
            if(existingCart.quantity ===1){
                const updatedItems = state.cartItems.filter((item)=>
                    item.id != itemId
                )
                state.cartItems=updatedItems;
            }else{
                existingCart.quantity--;
                existingCart.total = existingCart.total - existingCart.price
            }

        }
    }
})
export const cartItemSlicerAction = cartItemSlicer.actions;

export default cartItemSlicer.reducer;