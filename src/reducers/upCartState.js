const getTotal = items => items.reduce((acc, curr) => acc + curr.total, 0);

const itemOpts = (id, items) => {
  let index, item;

  const isInCart = items.some((it, i) => {
    index = i;
    item = it;
    return item.id === id;
  });

  if (!isInCart) {
    index = -1;
    item = null;
  }

  return { isInCart, index, item };
}

const findBook = (id, books) => books.find((book) => book.id === id);
const bookToItem = ({ id, title, price, currency, quantity }) => ({ id, title, price, currency, quantity });

const ifNotOne = (count) => count > 1 ? count - 1 : count;
const ifNotMax = (count, quantity) => count < quantity ? count + 1 : count;

const upCart_items = (items, index, item = null) => item ?
  itemOpts(item.id, items).isInCart ?
    [...items.slice(0, index), item, ...items.slice(index + 1)]
    :
    [...items, item]
  :
  [...items.slice(0, index), ...items.slice(index + 1)];

const upCart_itemCount = (items, item, index, getNewCount) => {
  const newCount = getNewCount();
  return upCart_items(items, index, { ...item, count: newCount, total: newCount * item.price });
}

const upCart = (items, item, isInCart, index, quantity, actionType) => {
  const { count } = item;

  switch (actionType) {
    case 'DEC': return upCart_itemCount(items, item, index, () => ifNotOne(count));
    case 'INC': return upCart_itemCount(items, item, index, () => ifNotMax(count, quantity));
    case 'REM': return upCart_items(items, index);

    default: return isInCart ? items : upCart_itemCount(items, item, index, () => 1);

    // default: return isInCart ?
    //   upCart_itemCount(items, item, index, () => ifNotMax(count, quantity)) :
    //   upCart_itemCount(items, item, index, () => 1);
  }
}

const newCartItems = (items, id, books, actionType) => {
  let { isInCart, item, index } = itemOpts(id, items);
  const book = findBook(id, books);
  if (!isInCart) item = bookToItem(book);
  return upCart(items, item, isInCart, index, book.quantity, actionType);
}

const counteraction = (cartState, cartItems, id, books, actionType) => {
  const newItems = newCartItems(cartItems, id, books, actionType);
  const total = getTotal(newItems);
  return { ...cartState, cartItems: newItems, total };
}

const upCartState = (state, action) => {
  if (!state) return {
    cartItems: [],
    currency: '$',
    total: 0
  };

  const id = action.bookId;
  const { cartState } = state;
  const { cartState: { cartItems }, booksState: { books } } = state;

  switch (action.type) {
    case 'ADD_BOOK_TO_CART':   return counteraction(cartState, cartItems, id, books);
    case 'DECREASE_ITEM_CART': return counteraction(cartState, cartItems, id, books, 'DEC');
    case 'INCREASE_ITEM_CART': return counteraction(cartState, cartItems, id, books, 'INC');
    case 'REMOVE_ITEM_CART':   return counteraction(cartState, cartItems, id, books, 'REM');
    default: return cartState;
  }
}

export default upCartState;