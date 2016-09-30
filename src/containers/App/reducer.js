import { AUTH_USER, AUTH_ERROR, SIGN_OUT_USER } from './actions';

const authInitialState = {
  authenticated: false,
  error: null,
};
export const authReducer = (state = authInitialState, action) => {
  switch (action.type) {
    case AUTH_USER:
      return Object.assign({}, state, authInitialState, {
        authenticated: true,
      });
    case AUTH_ERROR:
      return Object.assign({}, state, authInitialState, {
        error: action.payload.message,
      });
    case SIGN_OUT_USER:
      return Object.assign({}, state, authInitialState);
    default:
      return state;
  }
};

const appInitialState = {};
export const appReducer = (state = appInitialState, action) => ({
  auth: authReducer(state.auth, action),
});

export default appReducer;
