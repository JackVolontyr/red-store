import React from 'react';
import BookItem from '../BookItem';

import './BookList.css';

const FilterButton = ({ isSet, text, onClick }) =>
  <button
    onClick={onClick}
    type="button"
    className={`ml-2 flex-grow-1 btn btn-sm ${isSet ? 'btn-success' : 'btn-secondary'}`}
  >
    {text}
  </button>

const BookList = (props) => {
  const { books, filters, toggleFilter, addBookToCart } = props;
  return <div className="row">
    <div className="rs-book-list__sort mb-2 w-100 d-flex">
      <h4 className="m-0">Sort by:</h4>
      <div className="d-flex flex-grow-1">
        {Object.entries(filters).map(([key, value]) => {
          const text = key.toLowerCase().split('_').join(' ');
          return <FilterButton key={key} isSet={value} text={`${text} - ${value}`} onClick={() => toggleFilter(key)} />
        })}
      </div>
    </div>

    <ul className="rs-book-list d-flex flex-wrap">
      {books.map(({ id, ...book }) =>
        <li className="col-md-6" key={id}>
          <BookItem book={book} addBookToCart={() => addBookToCart(id)} />
        </li>
      )}
    </ul>
  </div>
}

export default BookList;