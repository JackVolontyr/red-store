import { IN_STOCK, BY_RATING, BY_PRICE, TO_HIGH, TO_LOW, optionsOf } from '../utils';

const upBooks = (books, index, book) => [
  ...books.slice(0, index), book, ...books.slice(index + 1)
];

const toggleAsAdded = (booksState, id, books, value) => {
  const { index, element: book } = optionsOf(books, id);
  const newBook = { ...book, isInCart: value };
  return {
    ...booksState,
    books: upBooks(books, index, newBook)
  }
}

const unsetAllAsAdded = books => books.map(book => ({ ...book, isInCart: false }));

const toHigh = (key) => (a, b) => a[key] - b[key];
const toLow = (key) => (a, b) => b[key] - a[key];
const byQuantity = a => a.quantity > 0;

const filteredBooksState = (filter, booksState) => {
  const { books, filters, cache } = booksState;
  const value = filters[filter];
  let newBooks, valueStock, valueRating, valuePrice;

  switch (filter) {
    case IN_STOCK:
      valueStock = value ? false : true;
      newBooks = valueStock ? books.filter(byQuantity) : cache;
      return { ...booksState, filters: { ...filters, IN_STOCK: valueStock }, books: newBooks };

    case BY_RATING: 
      switch (value) {
        case false:
          valueRating = TO_LOW;
          valuePrice = false;
          newBooks = books.sort(toLow('rating'));
          break;
        case TO_LOW:
          valueRating = TO_HIGH;
          valuePrice = false;
          newBooks = books.sort(toHigh('rating')); 
          break;
        case TO_HIGH:
          valueRating = false;
          valuePrice = false;
          newBooks = cache;
          break;
        default: 
          newBooks = books; 
          break;
      }
      return { ...booksState, filters: { ...filters, BY_PRICE: valuePrice, BY_RATING: valueRating }, books: newBooks };

    case BY_PRICE: 
      switch (value) {
        case false:
          valuePrice = TO_LOW;
          valueRating = false;
          newBooks = books.sort(toLow('price'));
          break;
        case TO_LOW:
          valuePrice = TO_HIGH;
          valueRating = false;
          newBooks = books.sort(toHigh('price')); 
          break;
        case TO_HIGH:
          valuePrice = false;
          valueRating = false;
          newBooks = cache;
          break;
        default: 
          newBooks = books; 
          break;
      }
      return { ...booksState, filters: { ...filters, BY_PRICE: valuePrice, BY_RATING: valueRating }, books: newBooks };

    default: return booksState;
  }
}

const upBooksState = (state, action) => {
  if (!state) return {
    cache: [],
    books: [],
    isLoading: true,
    error: null,
    filters: { IN_STOCK: false, BY_RATING: false, BY_PRICE: false },
  }

  // action.params are different for every action 
  const { type, filter, bookId: id, newBooks, error } = action;

  const { booksState } = state;
  const { books } = booksState;

  switch (type) {
    // 
    case 'FETCH_BOOKS_REQUEST': return { ...booksState, isLoading: true };
    // newBooks
    case 'FETCH_BOOKS_SUCCESS': return { ...booksState, books: newBooks, cache: newBooks, isLoading: false };
    // error
    case 'FETCH_BOOKS_FAILURE': return { ...booksState, isLoading: false, error };
    // 
    case 'GET_BOOKS_FROM_CACHE': return { ...booksState, books: booksState.cache, isLoading: false };
    // filter
    case 'TOGGLE_FILTER': return filteredBooksState(filter, booksState);

    case 'SET_BOOK_AS_ADDED_TO_CART': return toggleAsAdded(booksState, id, books, true);
    case 'UNSET_BOOK_AS_ADDED_TO_CART': return toggleAsAdded(booksState, id, books, false);
    case 'UNSET_ALL_BOOKS_AS_ADDED_TO_CART': return { ...booksState, books: unsetAllAsAdded(books) };

    default: return booksState;
  }
}

export default upBooksState;