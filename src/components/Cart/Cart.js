import { useSelector } from 'react-redux';
import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';

const Cart = (props) => {
  const cartState = useSelector((state)=> state.cartItem.cartItems)
  console.log(cartState)
  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {cartState.map((item)=>(

        <CartItem
          item={{ title: item.title, quantity: item.quantity, total: item.total, price: item.price, description : item. description, id: item.id }}
        />
        ))}
      </ul>
    </Card>
  );
};

export default Cart;
