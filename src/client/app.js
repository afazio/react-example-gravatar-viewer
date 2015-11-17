import React from 'react';
import { render } from 'react-dom';
import { Router, Route } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import { combineReducers } from 'redux-immutablejs';

import logger from 'logger';
import history from 'app-history';
import * as reducers from 'reducers'
import App from 'containers/App';
import GravatarViewer from 'components/GravatarViewer';

const reducer = combineReducers(reducers);
const createStoreWithMiddleware = applyMiddleware(thunk, promise, logger)(createStore);
const store = createStoreWithMiddleware(reducer);

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <Route path="/:email" component={GravatarViewer} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);

