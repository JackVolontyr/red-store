import React, { Fragment } from 'react';

const BookItem = ({ book }) => <Fragment>
  <span>Title: {book.title}</span>
  <br/>
  <span>Author: {book.author}</span>
</Fragment>

export default BookItem;