import { unsetAllAsAdded, toggleAsAdded } from './upBooksState.added';
import filtered from './upBooksState.filtered';
import { IN_STOCK, BY_RATING, BY_PRICE, SEARCH_BY } from '../utils';

const INIT_FILTERS = { IN_STOCK: false, BY_RATING: false, BY_PRICE: false, SEARCH_BY: '' };
const INIT_BOOKS_STATE = {
  cache: [],
  books: [],
  isLoading: true,
  error: null,
  filters: { ...INIT_FILTERS },
};

const upBooksState = (state, action) => {
  if (!state) return { ...INIT_BOOKS_STATE };

  // action.params are different for every action 
  const {
    type,
    bookId: id,
    filter, request,
    newBooks,
    error
  } = action;

  const { booksState } = state;
  const { cache } = booksState;

  switch (type) {
    case 'FETCH_BOOKS_REQUEST': return { ...booksState, isLoading: true };
    // newBooks
    case 'FETCH_BOOKS_SUCCESS': return {
      ...booksState, books: [...newBooks], cache: [...newBooks], isLoading: false
    };
    // error
    case 'FETCH_BOOKS_FAILURE': return { ...booksState, isLoading: false, error };
    case 'GET_BOOKS_FROM_CACHE': return { ...booksState, books: [...cache], isLoading: false, filters: { ...INIT_FILTERS } };
    // filter
    case 'TOGGLE_FILTER': return filtered(booksState, filter, false);
    // request
    case 'SEARCH_BY': return filtered(booksState, SEARCH_BY, request);

    case 'SET_BOOK_AS_ADDED_TO_CART': return toggleAsAdded(booksState, id, true);
    case 'UNSET_BOOK_AS_ADDED_TO_CART': return toggleAsAdded(booksState, id, false);
    case 'UNSET_ALL_BOOKS_AS_ADDED_TO_CART': return unsetAllAsAdded(booksState);

    default: return booksState;
  }
}

export { 
  upBooksState, INIT_BOOKS_STATE, 
  
  // IDE/React-linter BUG
  IN_STOCK, BY_RATING, BY_PRICE 
};