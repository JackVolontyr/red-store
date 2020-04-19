import React, { Fragment } from 'react';
import './BookItem.css';

const Rating = ({ rating }) =>
  <ul className="rs-book-item__rating d-flex p-0 m-0 list-unstyled">
    {[1, 2, 3, 4, 5].map((item) =>
      <li key={item}>
        <span className={`fa fa-star ${rating >= item ? 'checked' : ''}`}></span>
      </li>
    )}
  </ul>

const BookItem = ({
  book: { title, author, price, cover, rating, currency, quantity, isInCart },
  addBookToCart
}) =>
  <div className="rs-book-item d-flex border">
    <div className="rs-book-item__cover">
      <img src={cover} alt={title} />
    </div>
    <div className="rs-book-item__info d-flex flex-column">
      <Rating rating={rating} />
      <div className="rs-book-item__title rs-font">{title.toLowerCase()}</div>
      <div className="rs-book-item__author">{author}</div>
      {
        quantity ?
          <Fragment>
            <div className="rs-book-item__price">{currency}{price}</div>
            {
              isInCart ?
                <button className="rs-add-to-cart btn btn-warning btn-sm" disabled>added</button>
                :
                <button onClick={addBookToCart} className="rs-add-to-cart btn btn-warning btn-sm">add to cart</button>
            }
          </Fragment>
          :
          <div className="rs-book-item__info--out-of-stock">Out of stock</div>
      }
    </div>
  </div>

export default BookItem;