import {createStore, applyMiddleware} from 'redux';
import loggedInReducer  from './loggedInReducer';
const thunkMiddleware = require('redux-thunk').default;
const store = createStore(loggedInReducer, applyMiddleware(thunkMiddleware));
export default store;