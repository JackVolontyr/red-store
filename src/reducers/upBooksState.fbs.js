import { IN_STOCK, BY_RATING, BY_PRICE, TO_HIGH, TO_LOW, sortMethods } from '../utils';

const { toKey, toParameter, byQuantity } = sortMethods;

const changeValue = (value, key, books, cacheFilters) => {
  value = value === false ? TO_LOW : (value === TO_LOW ? TO_HIGH : false);
  return value ?
    [value, books.sort(sortMethods[toKey(value)](key))] :
    [value, [...cacheFilters]];
}

const filteredBooks = (key, value, books) => books.sort(
  sortMethods[toKey(value)](toParameter(key))
);

const isRightFilter = (key, value) => (key === BY_RATING || key === BY_PRICE) && value;

const byKeyValue = (object, callback) => Object.entries(object).filter(
  ([key, value]) => isRightFilter(key, value)
);

const getFilteredBooks = (filters, cache) => {
  const [filter] = byKeyValue(filters);
  return filter ? filteredBooks(filter[0], filter[1], cache) : cache;
}

const inStockData = (value, books, cache, filters) => {
  books = value ? 
    books.filter(byQuantity) :
    getFilteredBooks(filters, cache);
  return [[...books], [...books]];
}

const filteredBooksState = (filter, booksState) => {
  const { filters, cache } = booksState;
  let { books, cacheFilters } = booksState;

  let value = filters[filter];

  switch (filter) {
    case IN_STOCK:
      value = value ? false : true;
      [books, cacheFilters] = inStockData(value, books, cache, filters);
      return { ...booksState, filters: { ...filters, IN_STOCK: value }, books, cacheFilters };

    case BY_RATING:
      [value, books] = changeValue(value, 'rating', books, cacheFilters);
      return { ...booksState, filters: { ...filters, BY_PRICE: false, BY_RATING: value }, books };

    case BY_PRICE:
      [value, books] = changeValue(value, 'price', books, cacheFilters);
      return { ...booksState, filters: { ...filters, BY_PRICE: value, BY_RATING: false }, books };

    default: return booksState;
  }
}

export default filteredBooksState;