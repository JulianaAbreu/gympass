import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

import DefaultLayout from './views/layouts/DefaultLayout';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Roboto mono';
  }
`;

const App = () => (
  <div className="App">
    <BrowserRouter>
      <Route path="/" component={DefaultLayout} />
    </BrowserRouter>
    <GlobalStyle />
  </div>
);

export default App;
