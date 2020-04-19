import { connect } from 'react-redux';
import { 
  removeBookFromCart,
  decreaseItem, increaseItem, 
  clearCart 
} from '../../actions';

import React from 'react';
import Cart from '../../components/Cart';

const CartContainer = (props) => <Cart {...props} />

const mapStateToProps = ({ cartState: { cartItems, currency, total } }) => ({ cartItems, currency, total });

// const mapDispatchToProps = (dispatch) => ({
//   decrease: (id) => dispatch(decreaseItem(id)),
//   increase: (id) => dispatch(increaseItem(id)),
//   remove: (id) => dispatch(removeItem(id)),
// });

const mapDispatchToProps = {
  decrease: decreaseItem,
  increase: increaseItem,
  remove: removeBookFromCart,
  clearCart: clearCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(CartContainer);