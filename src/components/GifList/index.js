import React from 'react';

import GifItem from '../GifItem';
import './index.css';

const GifList = (props = {}) => {
  const { errorMsg, gifs } = props;
  if (errorMsg) {
    return <div>{errorMsg}</div>;
  }
  
  return (
    <ul className="gif-list">
      {gifs.map((gif) => (
        <GifItem
          gif={gif}
          key={gif.id}
          {...props}
        />
      ))}
    </ul>
  );
};

export default GifList;

// onGifSelect={onGifSelect}
//           onFavoriteSelect={props.onFavoriteSelect}
//           onFavoriteDeselect={props.onFavoriteDeselect}
//           isAuthenticated={props.isAuthenticated}
//           isFavorite={props.isFavorite}
