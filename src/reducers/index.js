const initialState = {
  books: [],
  isLoading: true,
  error: null,

  cartItems: [],
  currency: '$',
  total: 1028
};

const checkObject = (key, value, array) => {
  let getIndex;

  const isInArray = array.some((item, index) => {
    getIndex = index;
    return item[key] === value;
  });
  
  return { isInArray, getIndex }; 
}

const findItem = (key, value, array) => array.find((item) => item[key] === value)

const addToArray = (item, index, array) => [...array.slice(0, index), item, ...array.slice(index + 1)];

const updatedCart = (cartItems, { id, title, price, currency }) => {
  const { isInArray, getIndex } = checkObject('id', id, cartItems);

  if (isInArray) {
    const newCount = cartItems[getIndex].count + 1;
    return addToArray(
      { id, title, price, currency, count: newCount, total: newCount * price },
      getIndex, cartItems
    );

  } else {
    return [
      ...cartItems,
      { id, title, price, currency, count: 1, total: price }
    ];
  }
}

export default (state = initialState, action) => { // console.log(action.type);
  switch (action.type) {
    case 'FETCH_BOOKS_REQUEST': return { ...state, isLoading: true };
    case 'FETCH_BOOKS_SUCCESS': return { ...state, books: action.payload, isLoading: false };
    case 'FETCH_BOOKS_FAILURE': return { ...state, isLoading: false, error: action.error };

    case 'ADD_BOOK_TO_CART': return { 
      ...state, 
      cartItems: updatedCart(state.cartItems, findItem('id', action.bookId, state.books)) 
    };
    case 'FETCH_CART_ITEMS_REQUEST': return {
      ...state,
    };
    case 'FETCH_CART_ITEMS_SUCCESS': return {
      ...state,
    };

    default: return state;
  }
}