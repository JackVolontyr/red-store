import { connect } from 'react-redux';
import { uploadBooks, resetBooks, errorBooks } from '../../actions';

import React, { Component } from 'react';
import BookItem from '../BookItem';
import Spinner from '../Spinner';
import ErrorView from '../ErrorView';
import { composeHoc, connectHoc } from '../Hoc';

import './BookList.css';

class BookList extends Component {
  componentDidMount() {
    const { bookstoreService, 
      uploadBooks, resetBooks, errorBooks } = this.props;
    resetBooks();
    bookstoreService.getBooks()
      .then((data) => uploadBooks(data))
      .catch((error) => errorBooks(error));
  }

  render() {
    const { books, isLoading, error } = this.props;

    const elements = books.map(({ id, ...book }) => <li className="col-6" key={id}>
      <BookItem book={book} />
    </li>);

    if (isLoading) {
      return <Spinner />
    } else if (error) {
      return <ErrorView />
    } else {
      return <div className="row">
        <ul className="rs-book-list d-flex flex-wrap">{elements}</ul>
      </div>
    }
  }
}

const mapStateToProps = ({ books, isLoading, error }) => {
  return { books, isLoading, error };
}
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

const mapDispatchToProps = { uploadBooks, resetBooks, errorBooks };


export default composeHoc(
  connectHoc(),
  connect(mapStateToProps, mapDispatchToProps)
)(BookList);