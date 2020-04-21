import { upBooksState } from './upBooksState';
import upCartState from './upCartState';

const reducer = (state, action) => {
  // console.log(action.type);
  // console.log(state);

  return {
    booksState: upBooksState(state, action),
    cartState: upCartState(state, action),
  }
}

export default reducer;