import React from 'react';
import './Cart.css';

const Cart = () => <div className="rs-cart row">
  <table className="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Item</th>
        <th scope="col">Price</th>
        <th scope="col">Count</th>
        <th scope="col">Action</th>
        <th className="text-right" scope="col">Total</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">1</th>
        <td>Старик и море</td>
        <td>$30</td>
        <td>2</td>
        <td className="rs-cart__actions">
          <button className="btn btn-outline-warning"><i className="fa fa-minus-circle" /></button>
          <button className="btn btn-outline-success"><i className="fa fa-plus-circle" /></button>
          <button className="btn btn-outline-danger"><i className="fa fa-trash-o" /></button>
        </td>
        <td className="text-right">$60</td>
      </tr>
    </tbody>
  </table>

  <div className="w-100 text-right" style={{paddingRight: "0.75rem"}}>Total: $60</div>
</div>

export default Cart;