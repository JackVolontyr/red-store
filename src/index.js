import { Provider } from 'react-redux';
import store from './store';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import ErrorCatcher from './components/ErrorCatcher';
import App from './components/App';

import { ProviderBookstoreService } from './components/BookstoreServiceContext';
import BookstoreService from './services/BookstoreService';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorCatcher>
        <ProviderBookstoreService value={new BookstoreService()}>
          <Router>
            <App />
          </Router>
        </ProviderBookstoreService>
      </ErrorCatcher>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
