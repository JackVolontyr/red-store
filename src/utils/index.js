const BY_RATING = 'BY_RATING';
const IN_STOCK = 'IN_STOCK';
const BY_PRICE = 'BY_PRICE';
const TO_HIGH = 'TO_HIGH';
const TO_LOW = 'TO_LOW';

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


export {
  BY_RATING, IN_STOCK, BY_PRICE, TO_HIGH, TO_LOW,
  optionsOf,
}