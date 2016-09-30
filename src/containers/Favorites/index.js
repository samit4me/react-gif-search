import React from 'react';
import { connect } from 'react-redux';

import GifList from '../../components/GifList';
import GifModal from '../../components/GifModal';
import { fetchFavoritedGifs, openModal, closeModal, favoriteGif, unfavoriteGif } from '../GiphySearch/actions';
import { getFavorites, getError, isModalOpen, getSelectedGif } from '../GiphySearch/selectors';
import { isAuthenticated } from '../App/selectors';

class Favorites extends React.Component {
  componentWillMount() {
    this.props.fetchFavoritedGifs();
  }

  render() {
    return (
      <div>
        <GifList
          gifs={this.props.gifs}
          errorMsg={this.props.errorMsg}
          isAuthenticated={this.props.authenticated}
          onGifSelect={this.props.handleGifSelect}
          onFavoriteSelect={this.props.handleFavoriteSelect}
          onFavoriteDeselect={this.props.handleFavoriteDeselect}
          isFavorite={true}
        />
        <GifModal
          modalIsOpen={this.props.modalIsOpen}
          selectedGif={this.props.selectedGif}
          onRequestClose={this.props.handleModalClose}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  gifs: getFavorites(state),
  errorMsg: getError(state) ? 'There was a problem fetching gifs!' : '',
  modalIsOpen: isModalOpen(state),
  selectedGif: getSelectedGif(state),
  authenticated: isAuthenticated(state),
});
const mapDispatchToProps = (dispatch) => ({
  fetchFavoritedGifs: () => dispatch(fetchFavoritedGifs()),
  handleGifSelect: (selectedGif) => dispatch(openModal(selectedGif)),
  handleFavoriteSelect: (selectedGif) => dispatch(favoriteGif(selectedGif)),
  handleFavoriteDeselect: (selectedGif) => dispatch(unfavoriteGif(selectedGif)),
  handleModalClose: () => dispatch(closeModal()),
});
const FavouritesContainer = connect(mapStateToProps, mapDispatchToProps)(Favorites);

export default FavouritesContainer;
