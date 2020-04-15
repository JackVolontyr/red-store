import { connect } from 'react-redux';
import React from 'react';
import Cart from '../../components/Cart';

const CartContainer = (props) => <Cart {...props} />

const mapStateToProps = ({ cartItems, currency, total }) => ({ cartItems, currency, total });
const mapDispatchToProps = () => ({
  decrease: (id) => console.log(id, 'decrease!'),
  increase: (id) => console.log(id, 'increase!'),
  remove: (id) => console.log(id, 'remove!'),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartContainer);