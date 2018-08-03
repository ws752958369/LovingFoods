import {createStore,applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers/index';

const createStoreWithMiddleWare = applyMiddleware(thunkMiddleware)(createStore);

export default function SharedStore(initialState) {
    const store = createStoreWithMiddleWare(rootReducer,initialState);
    return store;
}