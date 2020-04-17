import React from 'react';
import CartItem from '../CartItem/CartItem';
import './Cart.css';

const Cart = (props) => {
  const { cartItems, currency, total } = props;
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
          <th scope="col">Quantity in store</th>
          <th scope="col">Action</th>
          <th className="text-right" scope="col">Total</th>
        </tr>
      </thead>
      <tbody>{cartItems.map(renderRow)}</tbody>
    </table>

    <div className="w-100 text-right" style={{ paddingRight: "0.75rem" }}>Total: {currency}{total}</div>
  </div>
}

export default Cart;