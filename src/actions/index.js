const resetBooks = () => ({ type: 'FETCH_BOOKS_REQUEST' });
const uploadBooks = (newBooks) => ({ type: 'FETCH_BOOKS_SUCCESS', newBooks });
const errorBooks = (error) => ({ type: 'FETCH_BOOKS_FAILURE', error });

const addToCart = (bookId) => ({ type: 'ADD_BOOK_TO_CART', bookId });

const decreaseItemCart = (bookId) => ({ type: 'DECREASE_ITEM_CART', bookId });
const increaseItemCart = (bookId) => ({ type: 'INCREASE_ITEM_CART', bookId });
const removeItemCart = (bookId) => ({ type: 'REMOVE_ITEM_CART', bookId });

const fetchBooks = (dispatch, bookstoreService) => () => {
  dispatch(resetBooks());
  bookstoreService.getBooks()
    .then((data) => dispatch(uploadBooks(data)))
    .catch((error) => dispatch(errorBooks(error)));
}

export { 
  fetchBooks, 
  addToCart, 
  decreaseItemCart, increaseItemCart, removeItemCart
};