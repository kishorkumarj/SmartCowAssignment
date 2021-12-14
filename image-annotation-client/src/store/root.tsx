import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { initSaga } from './sagas';
import appReducer from './reducers/appReducer';
import userReducer from './reducers/userReducer';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  app: appReducer,
  user: userReducer
})

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(initSaga);

export default store;