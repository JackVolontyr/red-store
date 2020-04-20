import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { searchBy, toggleFilter, addBookToCart, getBooksFromCache, fetchBooks } from '../../actions';

import React, { Component } from 'react';
import BookList from '../../components/BookList';
import Spinner from '../../components/Spinner';
import ErrorView from '../../components/ErrorView';
import { composeHoc, connectHoc } from '../../components/Hoc';

class BookListContainer extends Component {

  componentDidMount() { 
    const { getBooksFromCache, books, fetchBooks} = this.props;
    books.length > 0 ? getBooksFromCache() : fetchBooks();
  }

  render() {
    const { 
      isLoading, error, fetchBooks, getBooksFromCache, bookstoreService, 
      ...props 
    } = this.props;

    if (isLoading) {
      return <Spinner />
    } else if (error) {
      return <ErrorView />
    } else {
      return <BookList {...props} />
    }
  }
}

// 1.
// const action = { type: 'UPLOAD_BOOKS', payload: newBooks };
// const mapDispatchToProps = (dispatch) => (
//   { uploadBooks: (newBooks) => dispatch(action) }
// );

// 2.
// import { uploadBooks } from '../../actions';
// const mapDispatchToProps = (dispatch) => (
//   { uploadBooks: (newBooks) => dispatch(uploadBooks(newBooks)) }
// );

// 3.
// import { uploadBooks } from '../../actions';
// import { bindActionCreators } from 'redux';
// const mapDispatchToProps = (dispatch) => bindActionCreators(
//   { uploadBooks }, dispatch
// );

// 4.
// const mapDispatchToProps = { uploadBooks, resetBooks, errorBooks };

// 5.
// const mapDispatchToProps = (dispatch, { bookstoreService }) => ({
//   fetchBooks: fetchBooks(dispatch, bookstoreService),
//   addToCart: (bookId) => dispatch(addToCart(bookId))
// });

// 6.
// const mapDispatchToProps = (dispatch, { bookstoreService }) => ({
//   fetchBooks: () => dispatch(fetchBooks(bookstoreService)()),
//   addToCart: (bookId) => dispatch(addToCart(bookId))
// });

// 7.
const mapDispatchToProps = (dispatch, { bookstoreService }) => {
  return bindActionCreators({
    fetchBooks: fetchBooks(bookstoreService),
    getBooksFromCache,
    addBookToCart,
    toggleFilter,
    searchBy,
  }, dispatch);
};

const mapStateToProps = ({ booksState }) => ({ ...booksState });

export default composeHoc(
  connectHoc(),
  connect(mapStateToProps, mapDispatchToProps)
)(BookListContainer);