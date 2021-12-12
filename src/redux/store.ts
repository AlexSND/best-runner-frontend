import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import appReducer from './reducer';
import appSaga from './saga';

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  appReducer,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(appSaga);