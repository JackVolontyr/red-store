import { connect } from 'react-redux';
import { loadBooks } from '../../actions';

import React, { Component } from 'react';
import BookItem from '../BookItem';
import { composeHoc, connectHoc } from '../Hoc';

import './BookList.css';

class BookList extends Component {
  componentDidMount() {
    const { bookstoreService, loadBooks } = this.props;
    loadBooks(bookstoreService.getBooks());
  }

  render() {
    const { books } = this.props;

    const elements = books.map(({ id, ...book }) => <li key={id}>
      {id}) <BookItem book={book} />
    </li>);

    return <ul className="rs-book-list">{elements}</ul>
  }
}

const mapStateToProps = ({ books }) => ({ books });
// 1.
// const action = { type: 'BOOKS_LOADED', payload: newBooks };
// const mapDispatchToProps = (dispatch) => ({ loadBooks: (newBooks) => dispatch(action) });

// 2.
// import { loadBooks } from '../../actions';
// const mapDispatchToProps = (dispatch) => ({ loadBooks: (newBooks) => dispatch(loadBooks(newBooks)) });

// 3.
// import { loadBooks } from '../../actions';
// import { bindActionCreators } from 'redux';
// const mapDispatchToProps = (dispatch) => bindActionCreators({ loadBooks }, dispatch);

const mapDispatchToProps = { loadBooks };


export default composeHoc(
  connectHoc(),
  connect(mapStateToProps, mapDispatchToProps)
)(BookList);