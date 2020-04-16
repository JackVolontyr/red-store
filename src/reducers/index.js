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
const bookToItem = ({ id, title, price, currency }) => ({ id, title, price, currency });

const ifNotOne = (count) => count > 1 ? count - 1 : count;
const ifNotMax = (count, countInStore) => {
  if (count < countInStore) {
    return count + 1;
  } else {
    alert(`Only ${countInStore} available!`);
    return count;
  }
};

const upCart_items = (items, index, item = null) => item ? 
  itemOpts(item.id, items).isInCart ?
    [...items.slice(0, index), item, ...items.slice(index + 1)] 
    :
    [...items, item] 
  :
  [...items.slice(0, index), ...items.slice(index + 1)];

const upCart_itemCount = (items, item, getNewCount) => {
  const newCount = getNewCount();
  const { id, price } = item;
  const { index } = itemOpts(id, items);
  const newItem = { ...item, count: newCount, total: newCount * price }
  return upCart_items(items, index, newItem);
}

const upCart = (items, item, books, actionType) => {
  const { id, count } = item;
  const { countInStore } = findBook(id, books);
  const { isInCart, index } = itemOpts(id, items);

  switch (actionType) {
    case 'DEC': return upCart_itemCount(items, item, () => ifNotOne(count));
    case 'INC': return upCart_itemCount(items, item, () => ifNotMax(count, countInStore));
    case 'REM': return upCart_items(items, index);

    default: return isInCart ?
      upCart_itemCount(items, item, () => ifNotMax(count, countInStore)) :
      upCart_itemCount(items, item, () => 1);
  }
}

const newCartItems = (items, id, books, actionType) => {
  const { isInCart, item } = itemOpts(id, items);
  return isInCart ? 
    upCart(items, item, books, actionType) :
    upCart(items, bookToItem(findBook(id, books)), books, actionType);
}

// reducer
const initialState = {
  books: [],
  isLoading: true,
  error: null,

  cartItems: [],
  currency: '$',
  total: 0
};

export default (state = initialState, action) => { // console.log(action.type);
  switch (action.type) {
    case 'FETCH_BOOKS_REQUEST': return { ...state, isLoading: true };
    case 'FETCH_BOOKS_SUCCESS': return { ...state, books: action.newBooks, isLoading: false };
    case 'FETCH_BOOKS_FAILURE': return { ...state, isLoading: false, error: action.error };

    case 'ADD_BOOK_TO_CART': return {
      ...state,
      cartItems: newCartItems(state.cartItems, action.bookId, state.books)
    };
    case 'DECREASE_ITEM_CART': return {
      ...state,
      cartItems: newCartItems(state.cartItems, action.bookId, state.books, 'DEC')
    };
    case 'INCREASE_ITEM_CART': return {
      ...state,
      cartItems: newCartItems(state.cartItems, action.bookId, state.books, 'INC')
    };
    case 'REMOVE_ITEM_CART': return {
      ...state,
      cartItems: newCartItems(state.cartItems, action.bookId, state.books, 'REM')
    };

    default: return state;
  }
}