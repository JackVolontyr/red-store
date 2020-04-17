const upBooksState = (state, action) => {
  if (!state) return {
    books: [],
    isLoading: true,
    error: null,
  }

  switch (action.type) {
    case 'FETCH_BOOKS_REQUEST': return { ...state.booksState, isLoading: true };
    case 'FETCH_BOOKS_SUCCESS': return { ...state.booksState, books: action.newBooks, isLoading: false };
    case 'FETCH_BOOKS_FAILURE': return { ...state.booksState, isLoading: false, error: action.error };
    default: return state.booksState;
  }
}

export default upBooksState;