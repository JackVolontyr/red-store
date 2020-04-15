import React from 'react';
import BookItem from '../BookItem';

import './BookList.css';

const BookList = ({ books = [] }) => <div className="row">
  <ul className="rs-book-list d-flex flex-wrap">
    {
      books.map(({ id, ...book }) => <li className="col-6" key={id}>
        <BookItem book={book} />
      </li>)
    }
  </ul>
</div>

export default BookList;