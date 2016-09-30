import { REQUEST_GIFS, FETCH_FAVORITED_GIFS, OPEN_MODAL, CLOSE_MODAL } from './actions';

const gifsInitialState = {
  data: [],
  favorites: [],
  error: false,
};
export const gifsReducer = (state = gifsInitialState, action) => {
  switch (action.type) {
    case REQUEST_GIFS:
      if (action.error) {
        return Object.assign({}, state, {
          error: action.error,
        });
      }
      return Object.assign({}, state, {
        data: action.payload.body.data,
        error: action.error,
      });
    case FETCH_FAVORITED_GIFS:
      var arr = [];
      for (var i in action.payload) {
        if (action.payload.hasOwnProperty(i)){
          arr.push(action.payload[i]);
        }
      }
      return Object.assign({}, state, {
        favorites: arr,
      });
    default:
      return state;
  }
};

const modalInitialState = {
  modalIsOpen: false,
  selectedGif: null,
};
export const modalReducer = (state = modalInitialState, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      return Object.assign({}, state, {
        modalIsOpen: true,
        selectedGif: action.payload,
      })
    case CLOSE_MODAL:
      return Object.assign({}, state, modalInitialState);
    default:
      return state;
  }
};

const giphySearchInitialState = {};
export const giphySearchReducer = (state = giphySearchInitialState, action) => ({
  gifs: gifsReducer(state.gifs, action),
  modal: modalReducer(state.modal, action),
});

export default giphySearchReducer;
