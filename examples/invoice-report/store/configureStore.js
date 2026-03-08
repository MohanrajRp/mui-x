import { applyMiddleware, combineReducers, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { invoiceReducer } from './reducer';
import { invoiceRootSaga } from './sagas';

const rootReducer = combineReducers({
  invoice: invoiceReducer,
});

export function configureInvoiceStore() {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

  sagaMiddleware.run(invoiceRootSaga);

  return store;
}
