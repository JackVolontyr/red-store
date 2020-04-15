const initialState = {
  books: [],
  isLoading: true,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_BOOKS_REQUEST': return { 
      books: [], 
      isLoading: true, 
      error: false 
    };
    case 'FETCH_BOOKS_SUCCESS': return { 
      books: action.payload, 
      isLoading: false, 
      error: false 
    };
    case 'FETCH_BOOKS_FAILURE': return { 
      books: [], 
      isLoading: false, 
      error: action.error 
    };

    default: return state;
  }
}