import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
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
    thunk,
    stringMiddleware,
    logMiddleware
  )
);

store.dispatch('TEST');

// const delayedAction = (dispatch) => {
//   setTimeout(() => dispatch({ type: 'DELAYED_ACTION' }), 4000);
// };

// const delayedActionCreator = (timeout) => (dispatch) => {
//   setTimeout(() => dispatch({ type: 'DELAYED_ACTION' }), timeout);
// };

const delayedActionCreator = (timeout) => (dispatch) => {
  setTimeout(() => dispatch({ type: 'DELAYED_ACTION' }), timeout);
};

store.dispatch(delayedActionCreator(4000));

export default store;