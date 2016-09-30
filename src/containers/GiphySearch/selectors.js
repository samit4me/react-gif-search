import { createSelector } from 'reselect';

const gifsSelector = state => state.giphySearch.gifs;
const modalSelector = state => state.giphySearch.modal;

export const getAllGifs = createSelector(
  gifsSelector,
  (gifs) => gifs.data,
);

export const getFavorites = createSelector(
  gifsSelector,
  (gifs) => gifs.favorites,
);

export const getError = createSelector(
  gifsSelector,
  (gifs) => gifs.error,
);

export const isModalOpen = createSelector(
  modalSelector,
  (modal) => modal.modalIsOpen,
);

export const getSelectedGif = createSelector(
  modalSelector,
  (modal) => modal.selectedGif,
);
