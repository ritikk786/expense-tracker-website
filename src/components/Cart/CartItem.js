import { useDispatch, useSelector } from 'react-redux';
import classes from './CartItem.module.css';
import { cartItemSlicerAction } from '../../Store/cartItem-redux';

const CartItem = (props) => {
  console.log(props.item)
  const dispatch = useDispatch();
  const cartItem = useSelector((state)=> state.cartItem.cartItems)
  console.log(cartItem)
    const addtoCart = ()=>{
      dispatch(cartItemSlicerAction.addingItem({
        id:props.item.id,
        title : props.item.title,
        price : props.item.price,
        description : props.item.description,
        quantity : props.item.quantity,
        total : props.item.total,
      }))
    }
    const deleteItem = ()=>{
      dispatch(cartItemSlicerAction.deleteItem(props.item.id))
    }
  const { title, quantity, total, price } = props.item;
  
  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${total}{' '}
          <span className={classes.itemprice}>(${price}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={deleteItem}>-</button>
          <button onClick={addtoCart}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
