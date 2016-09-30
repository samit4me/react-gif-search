import Firebase from 'firebase';
import reduxThunk from 'redux-thunk';
import { applyMiddleware, createStore, compose } from 'redux';

import reducer from './reducer';
import { verifyAuth } from './containers/App/actions';

// Setup Firebase
Firebase.initializeApp({
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  storageBucket: "",
  messagingSenderId: ""
});

const enhancer = compose(
  applyMiddleware(reduxThunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
);

export const configureStore = (preloadedState) => {
  const store = createStore(reducer, preloadedState, enhancer);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducer', () => {
      const nextReducer = require('./reducer').default;
      store.replaceReducer(nextReducer);
    });
  }

  store.dispatch(verifyAuth());

  return store;
};
