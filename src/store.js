import { createStore, applyMiddleware } from "redux";
import reducer from "./reducers";

// .... = ({getState, dispatch}) => (next)     => (action) => {
const stringMiddleware = (store) => (dispatch) => (action) => {
  if (typeof action === 'string') return dispatch({ type: action });
  return dispatch(action);
}

const logMiddleware = (store) => (dispatch) => (action) => {
  console.log(action.type);
  return dispatch(action);
}

const store = createStore(
  // ...., storeEnhancer
  reducer, applyMiddleware(
    stringMiddleware,
    logMiddleware
  )
);

store.dispatch('TEST');

export default store;