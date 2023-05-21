import { useDispatch, useSelector } from 'react-redux';
import Card from '../UI/Card';
import classes from './ProductItem.module.css';
import { cartItemSlicerAction } from '../../Store/cartItem-redux';

const ProductItem = (props) => {
  const { title, price, description } = props;
  const dispatch = useDispatch();
  const cartItem = useSelector((state)=> state.cartItem.cartItems)
  console.log(cartItem)
    const addtoCart = ()=>{
      dispatch(cartItemSlicerAction.addingItem({
        id:props.items.id,
        title : props.items.title,
        price : props.items.price,
        description : props.items.description,
      }))
    }
  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{props.items.title}</h3>
          <div className={classes.price}>${props.items.price.toFixed(2)}</div>
        </header>
        <p>{props.items.description}</p>
        <div className={classes.actions}>
          <button onClick={addtoCart}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
