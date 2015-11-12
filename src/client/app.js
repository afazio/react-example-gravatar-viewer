import React from 'react';
import { render } from 'react-dom';
import { Router, Route } from 'react-router';
import history from './app-history';

import App from './containers/App';
import GravatarViewer from './containers/GravatarViewer';

render(
  <Router history={history}>
    <Route path="/" component={App}>
      <Route path="/:email" component={GravatarViewer} />
    </Route>
  </Router>,
  document.getElementById('app')
);
