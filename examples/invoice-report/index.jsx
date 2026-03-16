import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './App';
import { configureInvoiceStore } from './store/configureStore';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
const store = configureInvoiceStore();

root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
