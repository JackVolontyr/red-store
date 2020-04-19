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

const byQuantity = a => a.quantity > 0;
const toName = value => value.split('_').join('').toLowerCase();

const changeValue = (value, key, books, cache) => {
  value = value === false ? TO_LOW : (value === TO_LOW ? TO_HIGH : false);
  
  const methods = {
    tohigh: (key) => (a, b) => a[key] - b[key],
    tolow: (key) => (a, b) => b[key] - a[key],
  };

  return value ? 
    [value, books.sort(methods[toName(value)](key))]:
    [value, cache]; 
}

const filteredBooksState = (filter, booksState) => {
  const { filters, cache } = booksState;
  let { books } = booksState;
  let value = filters[filter];

  switch (filter) {
    case IN_STOCK:
      value = value ? false : true;
      books = value ? books.filter(byQuantity) : cache;
      return { ...booksState, filters: { ...filters, IN_STOCK: value }, books };

    case BY_RATING: 
      [value, books] = changeValue(value, 'rating', books, cache);
      return { ...booksState, filters: { ...filters, BY_PRICE: false, BY_RATING: value }, books };

    case BY_PRICE: 
      [value, books] = changeValue(value, 'price', books, cache);
      return { ...booksState, filters: { ...filters, BY_PRICE: value, BY_RATING: false }, books };

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