import { optionsOf } from '../utils'; 

const getTotal = items => items.reduce((acc, curr) => acc + curr.total, 0);

const findBook = (id, books) => books.find((book) => book.id === id);
const bookToItem = ({ id, title, price, currency, quantity }) => ({ id, title, price, currency, quantity });

const ifNotOne = (count) => count > 1 ? count - 1 : count;
const ifNotMax = (count, quantity) => count < quantity ? count + 1 : count;

const upCart_items = (items, index, item = null) => item ?
  optionsOf(items, item.id).isIn ?
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
  let { isIn: isInCart, element: item, index } = optionsOf(items, id);
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
  const initialCartState = {
    cartItems: [],
    currency: '$',
    total: 0
  };

  if (!state) return initialCartState;

  const id = action.bookId;
  const { cartState } = state;
  const { cartState: { cartItems }, booksState: { books } } = state;

  switch (action.type) {
    case 'ADD_BOOK_TO_CART': return counteraction(cartState, cartItems, id, books);
    case 'DECREASE_ITEM_CART': return counteraction(cartState, cartItems, id, books, 'DEC');
    case 'INCREASE_ITEM_CART': return counteraction(cartState, cartItems, id, books, 'INC');
    case 'REMOVE_ITEM_CART': return counteraction(cartState, cartItems, id, books, 'REM');
    case 'REMOVE_ALL_ITEM_FROM_CART': return initialCartState;
    default: return cartState;
  }
}

export default upCartState;