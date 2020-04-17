import { connect } from 'react-redux';
import { decreaseItemCart, increaseItemCart, removeItemCart } from '../../actions';

import React from 'react';
import Cart from '../../components/Cart';

const CartContainer = (props) => <Cart {...props} />

const mapStateToProps = ({ cartState: { cartItems, currency, total } }) => ({ cartItems, currency, total });

// const mapDispatchToProps = (dispatch) => ({
//   decrease: (id) => dispatch(decreaseItemCart(id)),
//   increase: (id) => dispatch(increaseItemCart(id)),
//   remove: (id) => dispatch(removeItemCart(id)),
// });

const mapDispatchToProps = {
  decrease: decreaseItemCart,
  increase: increaseItemCart,
  remove: removeItemCart
};

export default connect(mapStateToProps, mapDispatchToProps)(CartContainer);