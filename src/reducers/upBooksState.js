import { IN_STOCK, BY_RATING, TO_HIGH, optionsOf } from '../utils'; 

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

const filteredBooks = (filter, filters, books, cache) => {
  switch (filter) {
    case IN_STOCK: return books; 
    case BY_RATING: return books; 
    case TO_HIGH: return books; 
    default: return books;
  }
}

const upBooksState = (state, action) => {
  if (!state) return {
    cache: [],
    books: [],
    isLoading: true,
    error: null,
    filters: { IN_STOCK: false, BY_RATING: false, TO_HIGH: false },
  }

  // action.params are different for every action 
  const { type, filter, bookId: id, newBooks, error } = action;

  const { booksState } = state;
  const { cache, books, filters } = booksState;

  switch (type) {
    // 
    case 'FETCH_BOOKS_REQUEST': return { ...booksState, isLoading: true };
    // newBooks
    case 'FETCH_BOOKS_SUCCESS': return { ...booksState, books: newBooks, isLoading: false };
    // error
    case 'FETCH_BOOKS_FAILURE': return { ...booksState, isLoading: false, error };
    // 
    case 'GET_BOOKS_FROM_CACHE': return { ...booksState, isLoading: false };
    // filter
    case 'TOGGLE_FILTER':
      const newBS = filteredBooks(filter, filters, books, cache);
      console.log(newBS);
      
      return { ...booksState, books: newBS };

    case 'SET_BOOK_AS_ADDED_TO_CART': return toggleAsAdded(booksState, id, books, true);
    case 'UNSET_BOOK_AS_ADDED_TO_CART': return toggleAsAdded(booksState, id, books, false);
    case 'UNSET_ALL_BOOKS_AS_ADDED_TO_CART': return { ...booksState, books: unsetAllAsAdded(books) };

    default: return booksState;
  }
}

export default upBooksState;