import Firebase from 'firebase';
import { browserHistory } from 'react-router';

// Action Types
export const namespace = 'App';
export const SIGN_IN_USER = `${namespace}/SIGN_IN_USER`;
export const SIGN_OUT_USER = `${namespace}/SIGN_OUT_USER`;
export const AUTH_USER = `${namespace}/AUTH_USER`;
export const AUTH_ERROR = `${namespace}/AUTH_ERROR`;

// Action Creators
export const authUser = () => ({
  type: AUTH_USER,
})

export const authError = (error) => ({
  type: AUTH_ERROR,
  payload: error,
})

export const signUpUser = (email, password) => (dispatch) => {
  Firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(response => {
      dispatch(authUser());
    })
    .catch(error => {
      console.log(error);
      dispatch(authError(error));
    });
};
export const signInUser = (email, password) => (dispatch) => {
  Firebase.auth().signInWithEmailAndPassword(email, password)
    .then(response => {
      dispatch(authUser());
    })
    .catch(error => {
      console.log(error);
      dispatch(authError(error));
    });
};

export const signOutUser = () => {
  Firebase.auth().signOut();
  browserHistory.push('/');
  return {
    type: SIGN_OUT_USER,
  };
};

export const verifyAuth = () => (dispatch) => {
  Firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      dispatch(authUser());
    } else {
      dispatch(signOutUser());
    }
  });
};
