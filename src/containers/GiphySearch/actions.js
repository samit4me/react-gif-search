import Firebase from 'firebase';
import request from 'superagent';

// Helpers
const getUserId = () => {
  const currentUser = Firebase.auth().currentUser;
  return currentUser ? currentUser.uid : null;
};

// Action Types
export const namespace = 'GiphyPage';
export const REQUEST_GIFS = `${namespace}/REQUEST_GIFS`;
export const FETCH_FAVORITED_GIFS = `${namespace}/FETCH_FAVORITED_GIFS`;
export const OPEN_MODAL = `${namespace}/OPEN_MODAL`;
export const CLOSE_MODAL = `${namespace}/CLOSE_MODAL`;

// Action Creators
export const requestGifs = (term = null) => (dispatch) => {
  request
    .get('http://api.giphy.com/v1/gifs/search')
    .query({ api_key: 'dc6zaTOxFJmzC' })
    .query({ q: term.replace(/\s/g, '+') })
    .query({ limit: 100 })
    .then((response) => {
      dispatch({
        type: REQUEST_GIFS,
        payload: response,
      });
    });
};

export const fetchFavoritedGifs = () => (dispatch) => {
  const userId = getUserId();
  if (userId) {
    Firebase
      .database()
      .ref(userId)
      .on('value', (snapshot) => {
        dispatch({
          type: FETCH_FAVORITED_GIFS,
          payload: snapshot.val()
        })
      });
  }
};

export const favoriteGif = (selectedGif) => (dispatch) => {
  const userId = getUserId();
  if (userId) {
    Firebase
      .database()
      .ref(userId)
      .update({
        [selectedGif.id]: selectedGif
      });
  }
};

export const unfavoriteGif = (selectedGif) => (dispatch) => {
  const userId = getUserId();
  if (userId) {
    Firebase
      .database()
      .ref(userId)
      .child(selectedGif.id)
      .remove();
  }
};

export const openModal = (gif) => ({
  type: OPEN_MODAL,
  payload: gif,
})

export const closeModal = () => ({
  type: CLOSE_MODAL,
})