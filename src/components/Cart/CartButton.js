import { useDispatch, useSelector } from 'react-redux';
import classes from './CartButton.module.css';
import { cartSlicerAction } from '../../Store/cart-redux';

const CartButton = (props) => {
  const cartnumber = useSelector((state)=> state.cartItem.totalcart)
  const dispatch = useDispatch()
  const carthandler =()=>{
    dispatch(cartSlicerAction.showCart())
  }
  return (
    <button className={classes.button} onClick={carthandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartnumber}</span>
    </button>
  );
};

export default CartButton;
