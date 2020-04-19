import upBooksState from './upBooksState';
import { uploadBooks, toggleFilter } from '../actions';
import { IN_STOCK, BY_RATING, TO_HIGH } from '../utils'; 
import BookstoreService from '../services/BookstoreService';

const state = {
  booksState: {
    cache: [],
    books: [],
    isLoading: true,
    error: null,
    filters: { IN_STOCK: false, BY_RATING: false, TO_HIGH: false },
  },
  cartState: {},
};

const newBooks = new BookstoreService()._data;

// UPLOAD
it('count of books in new state should be equal to two', () => {
  const action = uploadBooks(newBooks);
  const newState = upBooksState(state, action);
  expect(newState.books).toHaveLength(5);
});

describe("books filters", () => {
  let newState;
  state.booksState.books = newBooks;
  state.booksState.cache = newBooks;
  const filters = state.booksState.filters;

  it('set and unset `IN_STOCK` filter works correct', () => {
    const action = toggleFilter(IN_STOCK);
    
    filters[IN_STOCK] = false;
    newState = upBooksState(state, action);
    // console.log(newState);
    expect(newState.books).toHaveLength(4);
  
    filters[IN_STOCK] = true;
    newState = upBooksState(state, action);
    // console.log(newState);
    expect(newState.books).toHaveLength(5);
  });
  
  it('set and unset `BY_RATING` filter works correct', () => {
    const action = toggleFilter(BY_RATING);
    
    filters[BY_RATING] = false;
    newState = upBooksState(state, action);
    // console.log(newState);
    expect(newState.books[0].rating).toBe(5);
  
    filters[BY_RATING] = true;
    newState = upBooksState(state, action);
    // console.log(newState);
    expect(newState.books).toHaveLength(5);
  });
  
  it('set and unset `TO_HIGH` filter works correct', () => {
    const action = toggleFilter(TO_HIGH);
    
    filters[TO_HIGH] = false;
    newState = upBooksState(state, action);
    // console.log(newState);
    expect(newState.books[0].price).toBe(50);
  
    filters[TO_HIGH] = true;
    newState = upBooksState(state, action);
    // console.log(newState);
    expect(newState.books).toHaveLength(5);
  });
});