import React, { Fragment } from 'react';
import './BookItem.css';

const BookItem = ({ 
  book: { title, author, price, cover, currency, quantity }, 
  addToCart 
}) => <div className="rs-book-item d-flex border">
  <div className="rs-book-item__cover">
    <img src={cover} alt={title} />
  </div>
  <div className="rs-book-item__info d-flex flex-column">
    <div className="rs-book-item__title rs-font">{title}</div>
    <div className="rs-book-item__author">{author}</div>
    { 
      quantity ? 
        <Fragment>
          <div className="rs-book-item__price">{currency}{price}</div>
          <button onClick={addToCart} className="rs-add-to-cart btn btn-warning btn-sm">add to cart</button>
        </Fragment>
        : 
        <div className="rs-book-item__info--out-of-stock">Out of stock</div>
    }
  </div>
</div>

export default BookItem;