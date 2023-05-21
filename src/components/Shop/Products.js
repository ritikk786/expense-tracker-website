import ProductItem from './ProductItem';
import classes from './Products.module.css';

const Products = (props) => {
  const dummy_item = [
    {id:1, title : 'book', price:9 , description: 'this is really healpful'},
    {id: 2, title : 'Test', price:19 , description: 'This is a first product - amazing!'}
  ]
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {dummy_item.map((item)=>
        <ProductItem
        items={item}
        key={item.id}
        // title={item.title}
        // price={item.price}
        // description={item.description}
      />
        )}
        
      </ul>
    </section>
  );
};

export default Products;
