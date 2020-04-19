import upBooksState from './upBooksState';
import { uploadBooks, toggleFilter } from '../actions';
import { IN_STOCK, BY_RATING, BY_PRICE } from '../utils';
import BookstoreService from '../services/BookstoreService';

const INIT_STATE = {
  booksState: {
    cache: [],
    books: [],
    isLoading: true,
    error: null,
    filters: { IN_STOCK: false, BY_RATING: false, BY_PRICE: false },
  },
  cartState: {},
};

let state, books;

const newBooks = new BookstoreService()._data;

const touchState = (state, INIT_STATE, action) => {
  const touchedState = { ...state, booksState: upBooksState(INIT_STATE, action) };
  return [touchedState, touchedState.booksState.books];
};

// UPLOAD
it('count of books in new state should be equal to two', () => {
  const action = uploadBooks(newBooks);
  [, books] = touchState(state, INIT_STATE, action);
  expect(books).toHaveLength(5);
});

describe("books filters", () => {
  [state, books] = touchState(state, INIT_STATE, uploadBooks(newBooks));

  it('set and unset `IN_STOCK` filter works correct', () => {
    const action = toggleFilter(IN_STOCK);

    [state, books] = touchState(state, state, action);
    expect(books).toHaveLength(4);

    [state, books] = touchState(state, state, action);
    expect(books).toHaveLength(5);
  });

  it('toLow, toHigh, unset `BY_RATING` filter works correct', () => {
    const action = toggleFilter(BY_RATING);

    [state, books] = touchState(state, state, action);
    expect(books[0].rating).toBe(5);

    [state, books] = touchState(state, state, action);
    expect(books[0].rating).toBe(1);

    [state, books] = touchState(state, state, action);
    expect(books).toHaveLength(5);
  });

  it('toLow, toHigh, unset `BY_PRICE` filter works correct', () => {
    const action = toggleFilter(BY_PRICE);

    [state, books] = touchState(state, state, action);
    expect(books[0].price).toBe(5);

    [state, books] = touchState(state, state, action);
    expect(books[0].price).toBe(1);

    [state, books] = touchState(state, state, action);
    expect(books).toHaveLength(5);
  });

  it('setted `IN_STOCK` works correct after unset the `BY_RATING`', () => {
    let action;
    action = toggleFilter(IN_STOCK);
    [state, books] = touchState(state, state, action);
    expect(books).toHaveLength(4);

    action = toggleFilter(BY_RATING);
    [state,] = touchState(state, state, action);
    [state,] = touchState(state, state, action);
    [state, books] = touchState(state, state, action);

    expect(books).toHaveLength(4);
  });

  it('setted `IN_STOCK` works correct after unset the `BY_PRICE`', () => {
    let action;
    action = toggleFilter(IN_STOCK);
    [state, books] = touchState(state, state, action);
    expect(books).toHaveLength(4);

    action = toggleFilter(BY_PRICE);
    [state,] = touchState(state, state, action);
    [state,] = touchState(state, state, action);
    [state, books] = touchState(state, state, action);
    expect(books).toHaveLength(4);
  });
});