import React from 'react';
import './Header.css';

const Header = ({ numberItems, currency = '$', total }) => <div className="rs-header__wrapper border-bottom">
  <header className="container">
    <div className="row d-flex justify-content-between align-items-center">
      <a href="/" className="rs-header__logo">Red-Store</a>
      <a href="/">
        <i className="fa fa-shopping-cart" /> {numberItems} items ({currency}{total})
      </a>
    </div>
  </header>
</div>

export default Header;