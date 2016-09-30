import React from 'react';
import Modal from 'react-modal';

import './index.css';

const GifModal = ({ selectedGif, modalIsOpen, onRequestClose }) => {
  if (!selectedGif) {
    return <div></div>;
  }
  const { id, images, slug, source, rating } = selectedGif;
  
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={() => onRequestClose()}>
      <div className="gif-modal">
        <img
          alt={slug.replace(/-/g, ' ').replace(id, '')}
          src={images.original.url}
        />
        <p><strong>Source:</strong> <a href={source}>{source}</a></p>
        <p><strong>Rating:</strong> {rating}</p>
        <button onClick={() => onRequestClose()}>close</button>
      </div>
    </Modal>
  );
};

export default GifModal;
