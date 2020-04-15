import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = ({ numberItems, currency = '$', total }) => <div className="rs-header__wrapper border-bottom">
  <header className="container">
    <div className="row d-flex justify-content-between align-items-center">
      <Link to="/" className="rs-header__logo">Red-Store</Link>
      <Link to="/cart">
        <i className="fa fa-shopping-cart" /> {numberItems} items ({currency}{total})
      </Link>
    </div>
  </header>
</div>

export default Header;