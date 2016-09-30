import React from 'react';

import Header from '../../containers/Header';
import './index.css';

const App = ({ children }) => (
  <div>
    <Header />
    {children}
  </div>
);

export default App;
