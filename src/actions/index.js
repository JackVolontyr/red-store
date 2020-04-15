const resetBooks = () => ({ type: 'FETCH_BOOKS_REQUEST' });
const uploadBooks = (newBooks) => ({ type: 'FETCH_BOOKS_SUCCESS', payload: newBooks });
const errorBooks = (error) => ({ type: 'FETCH_BOOKS_FAILURE', error: error });

const fetchBooks = (dispatch, bookstoreService) => () => {
  dispatch(resetBooks());
  bookstoreService.getBooks()
    .then((data) => dispatch(uploadBooks(data)))
    .catch((error) => dispatch(errorBooks(error)));
}

export { fetchBooks };