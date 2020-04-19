import { IN_STOCK, BY_RATING, BY_PRICE, TO_HIGH, TO_LOW } from '../utils';

const byQuantity = a => a.quantity > 0;
const toName = value => value.split('_').join('').toLowerCase();

const changeValue = (value, key, books, cacheFilters) => {
  value = value === false ? TO_LOW : (value === TO_LOW ? TO_HIGH : false);

  const methods = {
    tohigh: (key) => (a, b) => a[key] - b[key],
    tolow: (key) => (a, b) => b[key] - a[key],
  };

  return value ?
    [value, books.sort(methods[toName(value)](key))] :
    [value, [...cacheFilters]];
}

const inStockData = (value, books, cache) => {
  if (value) books = books.filter(byQuantity);
  return value ? [[...books], [...books]] : [[...cache], [...cache]];
}

const filteredBooksState = (filter, booksState) => {
  const { filters, cache } = booksState;
  let { books, cacheFilters } = booksState;

  let value = filters[filter];

  switch (filter) {
    case IN_STOCK:
      value = value ? false : true;
      [books, cacheFilters] = inStockData(value, books, cache);
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