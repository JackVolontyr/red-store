import React from 'react';
import './BookItem.css';

const BookItem = ({ book: { weblink, title, author, price, cover, currency = '$' }}) => <div 
  className="rs-book-item d-flex border"
>
  <div className="rs-book-item__cover">
    <img src={cover} alt={title} />
  </div>
  <div className="rs-book-item__info d-flex flex-column">
    <div className="rs-book-item__title rs-font">{title}</div>
    <div className="rs-book-item__author">{author}</div>
    <div className="rs-book-item__price">{currency}{price}</div>
    <button className="rs-add-to-cart btn btn-warning btn-sm">add to cart</button>
  </div>
</div>

export default BookItem;