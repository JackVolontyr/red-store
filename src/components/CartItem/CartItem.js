import React from 'react';
import './CartItem.css';
import { Fragment } from 'react';

const CartItem = ({ 
  cartItem: { id, title, price, currency, count, total },
  index, decrease, increase, remove 
}) => <Fragment>
  <th scope="row">{++index}</th>
  <td>{title}</td>
  <td>{currency}{price}</td>
  <td>{count}</td>
  <td className="rs-cart-item__actions">
    <button onClick={() => decrease(id)} className="btn btn-outline-warning"><i className="fa fa-minus-circle" /></button>
    <button onClick={() => increase(id)} className="btn btn-outline-success"><i className="fa fa-plus-circle" /></button>
    <button onClick={() => remove(id)} className="btn btn-outline-danger"><i className="fa fa-trash-o" /></button>
  </td>
  <td className="text-right">{currency}{total}</td>
</Fragment>

export default CartItem;