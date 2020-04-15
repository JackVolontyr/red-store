import React, { Fragment } from 'react';
import Cart from '../Cart/Cart';
import BookListContainer from '../../containers/BookListContainer';

const HomePage = () => <Fragment>
  <BookListContainer />
  <Cart />
</Fragment>

export default HomePage;