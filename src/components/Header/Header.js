import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = ({ numberItems, currency, total }) =>
	<div className="rs-header__wrapper rs-p-after border-bottom">
		<header className="container">
			<div className="row d-flex justify-content-between align-items-center">
				<Link to="/red-store-build/" className="rs-header__logo">Red-Store</Link>
				<Link to="/red-store-build/cart">
					<i className="fa fa-shopping-cart" /> {numberItems} items ({currency}{total})
			</Link>
			</div>
		</header>
	</div>

const mapStateToProps = ({ cartState: { cartItems, currency, total } }) => ({ numberItems: cartItems.length, currency, total });

export default connect(mapStateToProps)(Header);