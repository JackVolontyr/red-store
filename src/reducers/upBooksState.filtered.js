import { IN_STOCK, BY_RATING, TO_LOW, TO_HIGH, sortMethods } from '../utils';

const isNotSearch = request => request === false;
const isInStock = filter => filter === IN_STOCK;
const isByRating = filter => filter === BY_RATING;

const toggleValue = value => value ? false : true;
const switchValue = value => (value) ? ((value === TO_LOW) ? TO_HIGH : false) : TO_LOW;

const forInStock = (filters, value) => ({ ...filters, IN_STOCK: value });
const forRating = (filters, value) => ({ ...filters, BY_RATING: value, BY_PRICE: false });
const forPrice = (filters, value) => ({ ...filters, BY_RATING: false, BY_PRICE: value });

const setFilter_button = (booksState, filter) => {
  let { filters } = booksState;
  let value = filters[filter];

  value = isInStock(filter) ? toggleValue(value) : switchValue(value);

  filters = isInStock(filter) ?
    forInStock(filters, value) :
    isByRating(filter) ? forRating(filters, value) : forPrice(filters, value);

  return { ...booksState, filters };
}

const isEmpty = string => string[string.length - 1] === ' ';

const setFilter_search = (booksState, request) => {
  let { filters } = booksState;
  const specialCharacter = isEmpty(request) ? ' ' : '';
  request = request.trim() + specialCharacter;
  filters = { ...filters, BY_RATING: false, BY_PRICE: false, SEARCH_BY: request };
  return { ...booksState, filters };
}

const setFilter = (booksState, filter, request) => {
  booksState = isNotSearch(request) ?
    setFilter_button(booksState, filter) :
    setFilter_search(booksState, request);
  return { ...booksState };
}

const isAllFalse = array => !array.find(item => !!item);
const prepareSearchParam = param => param === '' ? false : true;
const isSearchBy = type => type === 'searchby';
const isSwitch = type => type === 'byrating' || type === 'byprice';

const filterBy = (array, type, param) => {
  const ms = sortMethods;
  const { toKey, toParameter } = ms;

  let request = param;
  let argument = toParameter(type);

  type = toKey(type);
  param = isSearchBy(type) ? prepareSearchParam(param) : toKey(param);


  array = isSwitch(type) ?
    array.sort(ms[type][param](argument)) :
    isSearchBy(type) ?
      array.filter(ms[type][param](request)) :
      array.filter(ms[type][param](argument));

  return [...array];
}

const filterBooks = booksState => {
  let { cache, filters } = booksState;
  let books = Object.entries(filters).reduce((acc, curr) => {
    const [key, value] = curr;
    return !!value ? filterBy(acc, key, value) : [...acc];
  }, cache);
  return [...books];
}

const touchFilters = booksState => {
  let { cache, filters } = booksState;
  const books = isAllFalse(Object.values(filters)) ? [...cache] : filterBooks(booksState);
  return { ...booksState, books };
}

const filtered = (booksState, changed, request) => {  
  booksState = setFilter(booksState, changed, request);
  booksState = touchFilters(booksState, changed, request);
  return { ...booksState };
}

export default filtered;