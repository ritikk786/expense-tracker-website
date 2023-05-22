import { createSlice } from "@reduxjs/toolkit";
import { cartSlicerAction } from "./cart-redux";

const initialCartItem = {
    cartItems: [],
    totalcart: 0,
    changed : false,
}

const cartItemSlicer = createSlice({
    name: 'cartItem',
    initialState: initialCartItem,
    reducers: {
        getItem(state,action){
            console.log(action.payload,'action')
            state.cartItems = action.payload.cartItems
            state.totalcart = action.payload.totalcart
        },
        addingItem(state, action) {
            const newItem = action.payload
            console.log(newItem)
            const existingCart = state.cartItems.find(item => item.id === newItem.id)
            state.totalcart++;
            state.changed = true;
            console.log(existingCart)
            if (!existingCart) {
                state.cartItems.push({
                    id: newItem.id,
                    title: newItem.title,
                    price: newItem.price,
                    description: newItem.description,
                    quantity: 1,
                    total: newItem.price,
                })
            }
            else {
                existingCart.quantity++
                existingCart.total = existingCart.total + newItem.price
            }
        },
        deleteItem(state, action) {
            const itemId = action.payload;
            const existingCart = state.cartItems.find(item => item.id === itemId)
            state.changed = true;
            state.totalcart--;
            if (existingCart.quantity === 1) {
                const updatedItems = state.cartItems.filter((item) =>
                    item.id != itemId
                )
                state.cartItems = updatedItems;
            } else {
                existingCart.quantity--;
                existingCart.total = existingCart.total - existingCart.price
            }

        }
    }
})

// action creator
export const fetchdata = ()=>{
    return async (dispatch)=>{
        const fetchcart = async () =>{
            const response = await fetch('https://expense-tcr-default-rtdb.firebaseio.com/expense.json')
            if (!response.ok) {
                throw new Error('something went wrong')
            }
            const data = await response.json()
            console.log(data,'data')
            return data 
        }
        try{
          const cartdata = await  fetchcart()
        //   dispatch(cartItemSlicer.actions.getItem(cartdata))
          dispatch(cartItemSlicer.actions.getItem({
            cartItems : cartdata.cartItems || [],
            totalcart : cartdata.totalcart,
          }))
        }
        catch(error){
            dispatch(cartSlicerAction.loading({
                status : 'error',
                title : 'Error',
                message : error.message
              }))
              setTimeout(()=>{
                dispatch(cartSlicerAction.loading())
              },2000)
        }
    }
}
export const sendcartdata = (cartItem) => {
    return async (dispatch) => {

        dispatch(cartSlicerAction.loading({
            status: 'pending',
            title: 'Sending',
            message: 'sending data!'
        }))

        const sendRequest = async () => {
            const response = await fetch('https://expense-tcr-default-rtdb.firebaseio.com/expense.json', {
                method: 'PUT',
                body: JSON.stringify({
                    cartItems : cartItem.cartItems,
                    totalcart : cartItem.totalcart,
 
                })
            })
            if (!response.ok) {
                throw new Error('something went wrong')
            }
            const data = await response.json()
            console.log('data', data)
           
        }
        try{ 
            await sendRequest()
            dispatch(cartSlicerAction.loading({
                status: 'success',
                title: 'Sent',
                message: ' data saved!'
            }))
            setTimeout(() => {
                dispatch(cartSlicerAction.loading())
            }, 2000)
        }
        catch(error){
            dispatch(cartSlicerAction.loading({
                status : 'error',
                title : 'Error',
                message : error.message
              }))
              setTimeout(()=>{
                dispatch(cartSlicerAction.loading())
              },2000)
        }
    }
}

export const cartItemSlicerAction = cartItemSlicer.actions;

export default cartItemSlicer.reducer;