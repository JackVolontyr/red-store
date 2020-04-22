const BY_RATING = 'BY_RATING';
const IN_STOCK = 'IN_STOCK';
const BY_PRICE = 'BY_PRICE';
const TO_HIGH = 'TO_HIGH';
const TO_LOW = 'TO_LOW';
const SEARCH_BY = 'SEARCH_BY';

// `optionsOf` element in `array` with `value`
const optionsOf = (array, value, key = 'id') => {
  let index, element;

  const isIn = array.some((elem, i) => {
    index = i;
    element = elem;
    return elem[key] === value;
  });

  if (!isIn) {
    index = -1;
    element = null;
  }

  return { isIn, index, element };
}
// const { index, element } = optionsOf(array, id, 'id');

const arrayToLowerCase = (...array) => array.map(item => item.toLowerCase());
const isSub = (string, sub) => string.indexOf(sub) > -1

const sortMethods = {
  toText: value => value.toString().split('_').join(' ').toLowerCase(),
  toKey: value => value.toString().split('_').join('').toLowerCase(),
  toParameter: value => value.toString().split('_')[1].toLowerCase(),

  searchby: {
    'true': request => book => {
      let { title, author } = book;
      [title, author, request] = arrayToLowerCase(title, author, request.trim())

      if (isSub(title, request) || isSub(author, request)) {
        return book;
      }
    },

    'false': () => a => a
  },
  instock: {
    'true': () => a => a.quantity > 0,
    'false': () => a => a
  },
  byrating: {
    tohigh: (key) => (a, b) => a[key] - b[key],
    tolow: (key) => (a, b) => b[key] - a[key],
  },
  byprice: {
    tohigh: (key) => (a, b) => a[key] - b[key],
    tolow: (key) => (a, b) => b[key] - a[key],
  }
};

export {
  BY_RATING, IN_STOCK, BY_PRICE, TO_HIGH, TO_LOW, SEARCH_BY,
  optionsOf, sortMethods,
}