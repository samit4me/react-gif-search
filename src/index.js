import React from 'react';
import ReactDOM from 'react-dom';
import get from 'lodash/get';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './containers/App';
import GiphySearch from './containers/GiphySearch';
import Signup from './containers/Signup';
import Login from './containers/Login';
import Favorites from './containers/Favorites';
import { configureStore } from './store';
import { isAuthenticated } from './containers/App/selectors';

const store = configureStore();

const requireAuth = (nextState, replace) => {
  const state = store.getState();
  const authenticated = isAuthenticated(state);
  const nextPathname = get(nextState, 'location.pathname');
  if (!authenticated) {
    let hasLocalStorageUser = false;
    for (let key in localStorage) {
      if (key.startsWith('firebase:authUser:')) {
        hasLocalStorageUser = true;
      }
    }
    if (!hasLocalStorageUser) {
      replace({
        pathname: '/login',
        state: { nextPathname },
      });
    }
  }
};

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={GiphySearch} />
        <Route path="signup" component={Signup} />
        <Route path="login" component={Login} />
        <Route path="favorites" component={Favorites} onEnter={requireAuth} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
