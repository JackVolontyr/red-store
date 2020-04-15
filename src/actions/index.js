const resetBooks = () => ({ type: 'FETCH_BOOKS_REQUEST' });
const uploadBooks = (newBooks) => ({ type: 'FETCH_BOOKS_SUCCESS', payload: newBooks });
const errorBooks = (error) => ({ type: 'FETCH_BOOKS_FAILURE', error: error });

const addToCart = (bookId) => ({ type: 'ADD_BOOK_TO_CART', bookId: bookId });
const resetCartItems = () => ({ type: 'FETCH_CART_ITEMS_REQUEST' });
const uploadCartItems = (newCartItems) => ({ type: 'FETCH_CART_ITEMS_SUCCESS', payload: newCartItems });

const fetchBooks = (dispatch, bookstoreService) => () => {
  dispatch(resetBooks());
  bookstoreService.getBooks()
    .then((data) => dispatch(uploadBooks(data)))
    .catch((error) => dispatch(errorBooks(error)));
}

const fetchCartItems = (dispatch, cartItems) => () => {
  dispatch(resetCartItems());
  dispatch(uploadCartItems(cartItems))
}

export { fetchBooks, addToCart, fetchCartItems };