import filteredBooksState from './upBooksState.fbs';
import toggleAsAdded from './upBooksState.taa';

const arrayToLowerCase = (...array) => array.map(item => item.toLowerCase());
const isSub = (string, sub) => string.indexOf(sub) > -1
const isNothing = string => string === ''

const searchByRequest = (request, booksState) => {
  let { books, cacheFilters, searchValue, filters } = booksState;
  let specialCharacter = (request[request.length - 1] === ' ') ? ' ' : '';

  const newBooks = isNothing(request) ? 
    cacheFilters :
    cacheFilters.filter(book => {
      let { title, author } = book;
      [title, author, request] = arrayToLowerCase(title, author, request.trim())

      if (isSub(title, request) || isSub(author, request)) {
        return book;
      }
    });

  return { 
    ...booksState,
    filters: { ...filters, BY_RATING: false, BY_PRICE: false },
    searchValue: request + specialCharacter, 
    books: [...newBooks] 
  };
}

const unsetAllAsAdded = books => books.map(book => ({ ...book, isInCart: false }));

const upBooksState = (state, action) => {
  if (!state) return {
    cache: [],
    cacheFilters: [],
    books: [],
    searchValue: '',
    isLoading: true,
    error: null,
    filters: { IN_STOCK: false, BY_RATING: false, BY_PRICE: false },
  }

  // action.params are different for every action 
  const {
    type,
    bookId: id,
    filter, request,
    newBooks,
    error
  } = action;

  const { booksState } = state;
  const { books, cache } = booksState;

  switch (type) {
    // 
    case 'FETCH_BOOKS_REQUEST': return { ...booksState, isLoading: true };
    // newBooks
    case 'FETCH_BOOKS_SUCCESS': return {
      ...booksState, books: [...newBooks], cache: [...newBooks], cacheFilters: [...newBooks], isLoading: false
    };
    // error
    case 'FETCH_BOOKS_FAILURE': return { ...booksState, isLoading: false, error };
    // 
    case 'GET_BOOKS_FROM_CACHE': return {
      ...booksState, books: [...cache], isLoading: false, filters: { IN_STOCK: false, BY_RATING: false, BY_PRICE: false }
    };
    // filter
    case 'TOGGLE_FILTER': return filteredBooksState(filter, booksState);
    // request
    case 'SEARCH_BY': return searchByRequest(request, booksState);

    case 'SET_BOOK_AS_ADDED_TO_CART': return toggleAsAdded(booksState, id, books, true);
    case 'UNSET_BOOK_AS_ADDED_TO_CART': return toggleAsAdded(booksState, id, books, false);
    case 'UNSET_ALL_BOOKS_AS_ADDED_TO_CART': return { ...booksState, books: unsetAllAsAdded(books) };

    default: return booksState;
  }
}

export default upBooksState;