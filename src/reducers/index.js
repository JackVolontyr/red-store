const initialState = { books: [] };

export default (state = initialState, action) => {
  switch (action.type) {
    case 'BOOKS_LOADED': return { books: action.payload };
    default: return state;
  }
}