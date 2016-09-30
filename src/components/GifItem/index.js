import React from 'react';

import './index.css';

class GifItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favorited: this.props.isFavorite
    };
    this.favoriteGif = this.favoriteGif.bind(this);
    this.unfavoriteGif = this.unfavoriteGif.bind(this);
    this.renderFavoriteHeart = this.renderFavoriteHeart.bind(this);
  }

  favoriteGif() {
    this.setState({ favorited: true });
    this.props.onFavoriteSelect(this.props.gif);
  }

  unfavoriteGif() {
    this.setState({ favorited: false });
    this.props.onFavoriteDeselect(this.props.gif);
  }

  renderFavoriteHeart() {
    if (!this.props.isAuthenticated) {
      return '';
    }
    if (this.state.favorited) {
      return <i className="favorite fa fa-heart" onClick={this.unfavoriteGif} />;
    }
    return <i className="favorite fa fa-heart-o" onClick={this.favoriteGif} />;
  }

  render() {
    const { gif, onGifSelect } = this.props;
    return (
      <div className="gif-item">
        {this.renderFavoriteHeart()}
        <img
          alt={gif.slug.replace(/-/g, ' ').replace(gif.id, '')}
          src={gif.images.downsized.url}
          onClick={() => onGifSelect(gif)} />
      </div>
    );
  }
}

export default GifItem;
