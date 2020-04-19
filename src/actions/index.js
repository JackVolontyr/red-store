const showLoadingBooks = () => 'FETCH_BOOKS_REQUEST';
const uploadBooks = newBooks => ({ type: 'FETCH_BOOKS_SUCCESS', newBooks });
const errorBooks = error => ({ type: 'FETCH_BOOKS_FAILURE', error });
const cachedBooks = () => 'GET_BOOKS_FROM_CACHE';

const toggleFilter = filter => ({ type: 'TOGGLE_FILTER', filter });

const setAdded = bookId => ({ type: 'SET_BOOK_AS_ADDED_TO_CART', bookId });
const unsetAdded = bookId => ({ type: 'UNSET_BOOK_AS_ADDED_TO_CART', bookId });
const unsetAddedAll = bookId => ({ type: 'UNSET_ALL_BOOKS_AS_ADDED_TO_CART', bookId });
const addToCart = bookId => ({ type: 'ADD_BOOK_TO_CART', bookId });

const decreaseItem = bookId => ({ type: 'DECREASE_ITEM_CART', bookId });
const increaseItem = bookId => ({ type: 'INCREASE_ITEM_CART', bookId });
const removeItem = bookId => ({ type: 'REMOVE_ITEM_CART', bookId });
const removeItemAll = () => 'REMOVE_ALL_ITEM_FROM_CART';

// const fetchBooks = (dispatch, bookstoreService) => () => {
//   dispatch(resetBooks());
//   bookstoreService.getBooks()
//     .then((data) => dispatch(uploadBooks(data)))
//     .catch((error) => dispatch(errorBooks(error)));
// }

const fetchBooks = bookstoreService => () => dispatch => {
  dispatch(showLoadingBooks());
  bookstoreService.getBooks()
    .then((data) => dispatch(uploadBooks(data)))
    .catch((error) => dispatch(errorBooks(error)));
}

const addBookToCart = (bookId) => dispatch => {
  dispatch(setAdded(bookId));
  dispatch(addToCart(bookId));
}

const removeBookFromCart = (bookId) => dispatch => {
  dispatch(unsetAdded(bookId));
  dispatch(removeItem(bookId));
}

const clearCart = () => dispatch => {
  dispatch(unsetAddedAll());
  dispatch(removeItemAll());
}

const getBooksFromCache = () => dispatch => {
  dispatch(showLoadingBooks());

  setTimeout(
    () => dispatch(cachedBooks()),
    500
  );
}

export {
  // test
  uploadBooks,
  
  fetchBooks, getBooksFromCache,
  toggleFilter, addBookToCart, removeBookFromCart,
  decreaseItem, increaseItem,
  clearCart
};