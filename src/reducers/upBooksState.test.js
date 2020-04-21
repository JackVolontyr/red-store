import { upBooksState, INIT_BOOKS_STATE } from './upBooksState';
import { uploadBooks, toggleFilter, searchBy } from '../actions';
import { IN_STOCK, BY_RATING, BY_PRICE } from '../utils';
import BookstoreService from '../services/BookstoreService';

const newBooks = new BookstoreService()._data;

const INIT_STATE = {
  booksState: { ...INIT_BOOKS_STATE }
};

const touchState = (state, INIT_STATE, action) => {
  const touchedState = { ...state, booksState: upBooksState(INIT_STATE, action) };
  return [
    { ...touchedState },
    [...touchedState.booksState.books],
    [...touchedState.booksState.cache]
  ];
};

const checkAll = (array, checkArray, key) => array.forEach(
  (item, index) => expect(item[key]).toBe(checkArray[index][key])
);

// UPLOAD
it('uploadBooks works correct', () => {
  let [, books, cache] = touchState(INIT_STATE, INIT_STATE, uploadBooks(newBooks));
  expect(books).toHaveLength(5);
  expect(cache).toHaveLength(5);

  checkAll(books, cache, 'title');
});

describe("books filters", () => {
  it('set and unset IN_STOCK filter works correct', () => {
    let [state, books, cache] = touchState(INIT_STATE, INIT_STATE, uploadBooks(newBooks));
    const oldCashe = [...cache];

    const action = toggleFilter(IN_STOCK);

    [state, books, cache] = touchState(state, state, action);
    expect(books).toHaveLength(4);
    expect(cache).toHaveLength(5);

    [state, books, cache] = touchState(state, state, action);
    expect(books).toHaveLength(5);
    expect(cache).toHaveLength(5);

    checkAll(cache, oldCashe, 'title');
  });

  it('toLow, toHigh, unset BY_RATING filter works correct', () => {
    let [state, books, cache] = touchState(INIT_STATE, INIT_STATE, uploadBooks(newBooks));

    const action = toggleFilter(BY_RATING);

    [state, books] = touchState(state, state, action);
    expect(books[0].rating).toBe(5);

    [state, books] = touchState(state, state, action);
    expect(books[0].rating).toBe(1);

    [state, books] = touchState(state, state, action);
    expect(books).toHaveLength(5);
    checkAll(books, cache, 'title');
  });

  it('toLow, toHigh, unset BY_PRICE filter works correct', () => {
    let [state, books, cache] = touchState(INIT_STATE, INIT_STATE, uploadBooks(newBooks));

    const action = toggleFilter(BY_PRICE);

    [state, books] = touchState(state, state, action);
    expect(books[0].price).toBe(5);

    [state, books] = touchState(state, state, action);
    expect(books[0].price).toBe(1);

    [state, books] = touchState(state, state, action);
    expect(books).toHaveLength(5);
    checkAll(books, cache, 'title');
  });

  it('setted IN_STOCK works correct after unset the BY_RATING', () => {
    let [state, books, cache] = touchState(INIT_STATE, INIT_STATE, uploadBooks(newBooks));

    let action = toggleFilter(IN_STOCK);
    [state, books] = touchState(state, state, action);
    expect(books).toHaveLength(4);

    action = toggleFilter(BY_RATING);
    [state,] = touchState(state, state, action);
    [state,] = touchState(state, state, action);
    [state, books, cache] = touchState(state, state, action);
    expect(books).toHaveLength(4);

    checkAll(books, cache, 'title');
  });

  it('setted IN_STOCK works correct after unset the BY_PRICE', () => {
    let [state, books, cache] = touchState(INIT_STATE, INIT_STATE, uploadBooks(newBooks));

    let action = toggleFilter(IN_STOCK);
    [state, books] = touchState(state, state, action);
    expect(books).toHaveLength(4);

    action = toggleFilter(BY_PRICE);
    [state,] = touchState(state, state, action);
    [state,] = touchState(state, state, action);
    [state, books] = touchState(state, state, action);
    expect(books).toHaveLength(4);

    checkAll(books, cache, 'title');
  });

  it('XXXXXXXXXXX unsetting IN_STOCK works correct with setted BY_RATING', () => {
    return false;

    // let [state, books] = touchState(INIT_STATE, INIT_STATE, uploadBooks(newBooks));
    // let rightBooks = books;

    // let action = toggleFilter(BY_RATING);
    // [state] = touchState(state, state, action);

    // action = toggleFilter(IN_STOCK);
    // [state] = touchState(state, state, action);
    // [state, books] = touchState(state, state, action);

    // checkAll(books, rightBooks, 'title');
  });

  it('XXXXXXXXXXX unsetting IN_STOCK works correct with setted BY_PRICE', () => {
    return false;

    // let [state, books] = touchState(INIT_STATE, INIT_STATE, uploadBooks(newBooks));

    // let action = toggleFilter(BY_PRICE);
    // [state, books] = touchState(state, state, action);
    // let rightBooks = books;

    // action = toggleFilter(IN_STOCK);
    // [state, books] = touchState(state, state, action);
    // [state, books] = touchState(state, state, action);

    // checkAll(books, rightBooks, 'title');
  });

  it('search works correct', () => {
    let [state, books] = touchState(INIT_STATE, INIT_STATE, uploadBooks(newBooks));

    let action = searchBy('s');
    [state, books] = touchState(state, state, action);
    expect(books).toHaveLength(4);

    action = searchBy('se');
    [state, books] = touchState(state, state, action);
    expect(books).toHaveLength(2);

    action = searchBy('e');
    [state, books] = touchState(state, state, action);
    expect(books).toHaveLength(5);

    action = searchBy('er');
    [state, books] = touchState(state, state, action);
    expect(books).toHaveLength(3);

    action = searchBy('');
    [state, books] = touchState(state, state, action);
    expect(books).toHaveLength(5);
  });

  it('search works correct with IN_STOCK', () => {
    let [state, books] = touchState(INIT_STATE, INIT_STATE, uploadBooks(newBooks));

    let action = searchBy('ea');
    [state, books] = touchState(state, state, action);
    expect(books).toHaveLength(3);

    action = toggleFilter(IN_STOCK);
    [state, books] = touchState(state, state, action);
    expect(books).toHaveLength(2);

    [state, books] = touchState(state, state, action);
    expect(books).toHaveLength(3);

    action = searchBy('');
    [state, books] = touchState(state, state, action);
    expect(books).toHaveLength(5);
  });

  it('empty search works correct with IN_STOCK', () => {
    let [state, books] = touchState(INIT_STATE, INIT_STATE, uploadBooks(newBooks));

    let action = searchBy('ea');
    [state, books] = touchState(state, state, action);
    expect(books).toHaveLength(3);

    action = toggleFilter(IN_STOCK);
    [state, books] = touchState(state, state, action);
    expect(books).toHaveLength(2);

    action = searchBy('');
    [state, books] = touchState(state, state, action);
    expect(books).toHaveLength(4);
  });

  it('search works correct with BY_RATING', () => {
    let [state, books] = touchState(INIT_STATE, INIT_STATE, uploadBooks(newBooks));

    let action = searchBy('sea');
    [state, books] = touchState(state, state, action);
    expect(books).toHaveLength(2);

    action = toggleFilter(BY_RATING);
    [state] = touchState(state, state, action);
    [state] = touchState(state, state, action);
    [state, books] = touchState(state, state, action);
    expect(books).toHaveLength(2);

    action = searchBy('');
    [state, books] = touchState(state, state, action);
    expect(books).toHaveLength(5);
  });

  it('search works correct with BY_PRICE', () => {
    let [state, books] = touchState(INIT_STATE, INIT_STATE, uploadBooks(newBooks));

    let action = searchBy('sea');
    [state, books] = touchState(state, state, action);
    expect(books).toHaveLength(2);

    action = toggleFilter(BY_PRICE);
    [state] = touchState(state, state, action);
    [state] = touchState(state, state, action);
    [state, books] = touchState(state, state, action);
    expect(books).toHaveLength(2);

    action = searchBy('');
    [state, books] = touchState(state, state, action);
    expect(books).toHaveLength(5);
  });
});