import React, { Fragment } from 'react';
import BookItem from '../BookItem';

import './BookList.css';
import { IN_STOCK, sortMethods } from '../../utils';

const { toText } = sortMethods;

const FilterButton = ({ filter, isSet, text, onClick }) =>
  <button
    onClick={onClick}
    type="button"
    className={`mb-1 mb-sm-0 ml-0 ml-sm-2 flex-grow-1 btn btn-sm ${isSet ? 'btn-success' : 'btn-secondary'}`}
  >
    {text}
    {(filter !== IN_STOCK) ? 
      <Fragment>
        :&nbsp;
        <span className={`rs-to-low ${isSet}`}>to low</span>
        &nbsp;/&nbsp;
        <span className={`rs-to-high ${isSet}`}>to high</span>
      </Fragment> : ''
    }
  </button>

const BookList = (props) => {
  const { books, filters, toggleFilter, addBookToCart } = props;
  return <div className="row">
    <div className="rs-p-after mb-2 w-100">
      <input className="form-control" type="text" placeholder="search by title and author" />
    </div>

    <div className="rs-book-list__sort rs-p-after mb-2 w-100 d-flex">
      <h4 className="m-0 d-none d-sm-block">Sort by:</h4>
      <div className="d-flex flex-column flex-sm-row flex-grow-1">
        {Object.entries(filters).map(([key, value]) => {
          return <FilterButton 
            key={key} 
            filter={key}
            isSet={value} 
            text={toText(key)} 
            onClick={() => toggleFilter(key)} />
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