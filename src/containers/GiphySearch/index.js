import React from 'react';
import debounce from 'lodash/debounce';
import { connect } from 'react-redux';

import GifList from '../../components/GifList';
import GifModal from '../../components/GifModal';
import SearchBar from '../../components/SearchBar';
import { requestGifs, openModal, closeModal, favoriteGif, unfavoriteGif } from './actions';
import { getAllGifs, getError, isModalOpen, getSelectedGif } from './selectors';
import { isAuthenticated } from '../App/selectors';

class GiphyPage extends React.Component {
  render() {
    const handleTermChange = (event) => this.props.requestGifs(event.target.value);
    return (
      <div>
        <SearchBar onTermChange={handleTermChange} />
        <GifList
          gifs={this.props.gifs}
          errorMsg={this.props.errorMsg}
          isAuthenticated={this.props.authenticated}
          onGifSelect={this.props.handleGifSelect}
          onFavoriteSelect={this.props.handleFavoriteSelect}
          onFavoriteDeselect={this.props.handleFavoriteDeselect}
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
  gifs: getAllGifs(state),
  errorMsg: getError(state) ? 'There was a problem fetching gifs!' : '',
  modalIsOpen: isModalOpen(state),
  selectedGif: getSelectedGif(state),
  authenticated: isAuthenticated(state),
});
const mapDispatchToProps = (dispatch) => ({
  handleGifSelect: (selectedGif) => dispatch(openModal(selectedGif)),
  handleFavoriteSelect: (selectedGif) => dispatch(favoriteGif(selectedGif)),
  handleFavoriteDeselect: (selectedGif) => dispatch(unfavoriteGif(selectedGif)),
  handleModalClose: () => dispatch(closeModal()),
  // Need searchTerm as react synthenic events not available inside of debounce()
  requestGifs: debounce((searchTerm) => dispatch(requestGifs(searchTerm)), 300),
});
const GiphyPageContainer = connect(mapStateToProps, mapDispatchToProps)(GiphyPage);

export default GiphyPageContainer;
