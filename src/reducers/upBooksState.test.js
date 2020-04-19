import upBooksState from './upBooksState';
import { uploadBooks, toggleFilter } from '../actions';
import { IN_STOCK, BY_RATING, BY_PRICE } from '../utils';
import BookstoreService from '../services/BookstoreService';

const INIT_STATE = {
  booksState: {
    cache: [],
    cacheFilters: [],
    books: [],
    isLoading: true,
    error: null,
    filters: { IN_STOCK: false, BY_RATING: false, BY_PRICE: false },
  },
  cartState: {},
};

const newBooks = new BookstoreService()._data;

const touchState = (state, INIT_STATE, action) => {
  const touchedState = { ...state, booksState: upBooksState(INIT_STATE, action) };
  return [
    {...touchedState}, 
    [...touchedState.booksState.books], 
    [...touchedState.booksState.cache], 
    [...touchedState.booksState.cacheFilters]
  ];
};

const checkAll = (array, checkArray, key) => array.forEach(
  (item, index) => expect(item[key]).toBe(checkArray[index][key])
);

// UPLOAD
it('uploadBooks works correct', () => {
  let [, books, cache, cacheFilters] = touchState(INIT_STATE, INIT_STATE, uploadBooks(newBooks));
  expect(books).toHaveLength(5);
  expect(cache).toHaveLength(5);
  expect(cacheFilters).toHaveLength(5);

  checkAll(books, cache, 'title');
  checkAll(cache, cacheFilters, 'title');
});

describe("books filters", () => {

  it('set and unset `IN_STOCK` filter works correct and cacheFilters is updated', () => {
    let [state, books, cache, cacheFilters] = touchState(INIT_STATE, INIT_STATE, uploadBooks(newBooks));
    const oldCashe = cache;

    const action = toggleFilter(IN_STOCK);

    [state, books, cache, cacheFilters] = touchState(state, state, action);
    expect(books).toHaveLength(4);
    expect(cache).toHaveLength(5);
    expect(cacheFilters).toHaveLength(4);

    [state, books, cache, cacheFilters] = touchState(state, state, action);
    expect(books).toHaveLength(5);
    expect(cache).toHaveLength(5);
    expect(cacheFilters).toHaveLength(5);

    checkAll(cache, oldCashe, 'title');
  });

  it('toLow, toHigh, unset `BY_RATING` filter works correct', () => {
    let [state, books, cache] = touchState(INIT_STATE, INIT_STATE, uploadBooks(newBooks));
    
    const action = toggleFilter(BY_RATING);

    [state, books] = touchState(state, state, action);
    expect(books[0].rating).toBe(5);

    [state, books] = touchState(state, state, action);
    expect(books[0].rating).toBe(1);

    [state, books] = touchState(state, state, action);
    checkAll(books, cache, 'title');
  });

  it('toLow, toHigh, unset `BY_PRICE` filter works correct', () => {
    let [state, books, cache] = touchState(INIT_STATE, INIT_STATE, uploadBooks(newBooks));
    
    const action = toggleFilter(BY_PRICE);

    [state, books] = touchState(state, state, action);
    expect(books[0].price).toBe(5);

    [state, books] = touchState(state, state, action);
    expect(books[0].price).toBe(1);

    [state, books] = touchState(state, state, action);
    checkAll(books, cache, 'title');
  });

  it('setted `IN_STOCK` works correct after unset the `BY_RATING`', () => {
    let [state, books, , cacheFilters] = touchState(INIT_STATE, INIT_STATE, uploadBooks(newBooks));
    
    let action = toggleFilter(IN_STOCK);
    [state, books, , cacheFilters] = touchState(state, state, action);
    expect(books).toHaveLength(4);

    action = toggleFilter(BY_RATING);
    [state,] = touchState(state, state, action);
    [state,] = touchState(state, state, action);
    [state, books] = touchState(state, state, action);
    expect(books).toHaveLength(4);

    checkAll(books, cacheFilters, 'title');
  });

  it('setted `IN_STOCK` works correct after unset the `BY_PRICE`', () => {
    let [state, books, , cacheFilters] = touchState(INIT_STATE, INIT_STATE, uploadBooks(newBooks));
    
    let action = toggleFilter(IN_STOCK);
    [state, books, , cacheFilters] = touchState(state, state, action);
    expect(books).toHaveLength(4);

    action = toggleFilter(BY_PRICE);
    [state,] = touchState(state, state, action);
    [state,] = touchState(state, state, action);
    [state, books] = touchState(state, state, action);
    expect(books).toHaveLength(4);

    checkAll(books, cacheFilters, 'title');
  });

  it('unsetting `IN_STOCK` works correct with setted `BY_RATING`', () => {
    let [state, books] = touchState(INIT_STATE, INIT_STATE, uploadBooks(newBooks));
    
    let action = toggleFilter(BY_RATING);
    [state, books] = touchState(state, state, action);
    let rightBooks = books;
    
    action = toggleFilter(IN_STOCK);
    [state, books] = touchState(state, state, action);
    [state, books] = touchState(state, state, action);

    checkAll(books, rightBooks, 'title');
  });

  it('unsetting `IN_STOCK` works correct with setted `BY_PRICE`', () => {
    let [state, books] = touchState(INIT_STATE, INIT_STATE, uploadBooks(newBooks));
    
    let action = toggleFilter(BY_PRICE);
    [state, books] = touchState(state, state, action);
    let rightBooks = books;
    
    action = toggleFilter(IN_STOCK);
    [state, books] = touchState(state, state, action);
    [state, books] = touchState(state, state, action);

    checkAll(books, rightBooks, 'title');
  });
});
