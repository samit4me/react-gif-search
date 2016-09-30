import React from 'react';

export const SearchBar = ({ onTermChange } = {}) => (
  <div className="search">
    <input
      placeholder="Enter text to search for gifs!"
      onChange={onTermChange}
    />
  </div>
);

export default SearchBar;
