import { connect } from 'react-redux';
import { addToCart, fetchBooks } from '../../actions';

import React, { Component } from 'react';
import BookList from '../../components/BookList';
import Spinner from '../../components/Spinner';
import ErrorView from '../../components/ErrorView';
import { composeHoc, connectHoc } from '../../components/Hoc';


class BookListContainer extends Component {

  componentDidMount() { this.props.fetchBooks(); }

  render() {
    const { books, isLoading, error, addToCart } = this.props;

    if (isLoading) {
      return <Spinner />
    } else if (error) {
      return <ErrorView />
    } else {
      return <BookList books={books} addToCart={addToCart} />
    }
  }
}

const mapStateToProps = ({ booksState: { books, isLoading, error } }) => ({ books, isLoading, error });

// 1.
// const action = { type: 'UPLOAD_BOOKS', payload: newBooks };
// const mapDispatchToProps = (dispatch) => ({ uploadBooks: (newBooks) => dispatch(action) });

// 2.
// import { uploadBooks } from '../../actions';
// const mapDispatchToProps = (dispatch) => ({ uploadBooks: (newBooks) => dispatch(uploadBooks(newBooks)) });

// 3.
// import { uploadBooks } from '../../actions';
// import { bindActionCreators } from 'redux';
// const mapDispatchToProps = (dispatch) => bindActionCreators({ uploadBooks }, dispatch);

// 4.
// const mapDispatchToProps = { uploadBooks, resetBooks, errorBooks };

// 5.
const mapDispatchToProps = (dispatch, { bookstoreService }) => ({
  fetchBooks: fetchBooks(dispatch, bookstoreService),
  addToCart: (bookId) => dispatch(addToCart(bookId))
});

export default composeHoc(
  connectHoc(),
  connect(mapStateToProps, mapDispatchToProps)
)(BookListContainer);