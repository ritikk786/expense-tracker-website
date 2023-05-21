import { useDispatch, useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { Fragment, useEffect } from 'react';
import Notification from './components/UI/Notification';
import { cartSlicerAction } from './Store/cart-redux';


let isInitial = true;

function App() {
  const cartState = useSelector((state)=> state.cart.iscart)
  const loadingState = useSelector((state)=> state.cart.Notification)
  const cartItem = useSelector((state)=> state.cartItem)
  const dispatch = useDispatch();
 

  useEffect(  ()=>{
    const fetchdata = async ()=>{
      if(isInitial){
        isInitial=false;
        return
      }
      try{
        dispatch(cartSlicerAction.loading({
          status : 'pending',
          title : 'Sending',
          message : 'sending data!'
        }))
        

        const response = await fetch('https://expense-tcr-default-rtdb.firebaseio.com/expense.json',{
          method : 'PUT',
          body : JSON.stringify(cartItem)
        })
        if(!response.ok){
         throw new Error('something went wrong')
        }
        const data = await response.json()
        console.log('data',data)
        dispatch(cartSlicerAction.loading({
          status : 'success',
          title : 'Sent',
          message : ' data saved!'
        }))
        setTimeout(()=>{
          dispatch(cartSlicerAction.loading(null))
        },2000)
      }
     
      catch(error){
        dispatch(cartSlicerAction.loading({
          status : 'error',
          title : 'Error',
          message : error.message
        }))
      }
      // dispatch(cartSlicerAction.loading())
    }
   fetchdata()
    
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
