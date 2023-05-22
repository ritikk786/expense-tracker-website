import { useDispatch, useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { Fragment, useEffect } from 'react';
import Notification from './components/UI/Notification';

import {cartItemSlicerAction, sendcartdata, fetchdata} from './Store/cartItem-redux'


let isInitial = true;

function App() {
  const cartState = useSelector((state)=> state.cart.iscart)
  const loadingState = useSelector((state)=> state.cart.Notification)
  const cartItem = useSelector((state)=> state.cartItem)
  const dispatch = useDispatch();
 
  useEffect(()=>{
    dispatch(fetchdata())
},[dispatch])

  useEffect(()=>{
      if(isInitial){
        isInitial=false;
        return;
      }
      if(cartItem.changed){

        dispatch(sendcartdata(cartItem))
      }
  },[cartItem])

  return (
    <Fragment>
    { loadingState && <Notification status={loadingState.status} title={loadingState.title} message={loadingState.message}/>}
    <Layout>
      {cartState && <Cart />}
      <Products />
    </Layout>
    </Fragment>
  );
}

export default App;
