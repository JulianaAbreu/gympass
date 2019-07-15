import React, { Fragment } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

import DefaultLayout from './views/layouts/DefaultLayout';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Roboto mono';
  }
`;

const App = () => (
  <Fragment>
    <BrowserRouter>
      <Route path="/" exact component={DefaultLayout} />
    </BrowserRouter>
    <GlobalStyle />
  </Fragment>
);

export default App;
