import { combineReducers } from 'redux';

import app from './containers/App/reducer';
import giphySearch from './containers/GiphySearch/reducer';

const rootReducer = combineReducers({
  app,
  giphySearch,
});

export default rootReducer;