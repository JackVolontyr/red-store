const initialState = {
  books: [],
  isLoading: true,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'RESET_BOOKS': return { 
      books: [], 
      isLoading: true, 
      error: false 
    };
    case 'UPLOAD_BOOKS': return { 
      books: action.payload, 
      isLoading: false, 
      error: false 
    };
    case 'ERROR_BOOKS': return { 
      books: [], 
      isLoading: false, 
      error: action.error 
    };
    
    default: return state;
  }
}