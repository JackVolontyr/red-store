import React from 'react';
import CartItem from '../CartItem/CartItem';
import './Cart.css';

const Cart = (props) => {
  const { 
    cartItems, currency, total, 
    clearCart 
  } = props;
  
  const renderRow = (item, index) => <tr key={item.id}>
    <CartItem {...props} cartItem={item} index={index} />
  </tr>

  return <div className="rs-cart row">
    <table className="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Item</th>
          <th scope="col">Price</th>
          <th scope="col">Count</th>
          <th scope="col" className="rs-cart__quantity">Quantity in store</th>
          <th scope="col">Action</th>
          <th className="text-right" scope="col">Total</th>
        </tr>
      </thead>
      <tbody>{cartItems.map(renderRow)}</tbody>
    </table>

    <div className="rs-cart__footer d-flex justify-content-between align-items-center w-100">
      <button onClick={clearCart} className="btn btn-danger">clear cart</button>
      Total: {currency}{total}
    </div>
  </div>
}

export default Cart;