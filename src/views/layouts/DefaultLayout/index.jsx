import React from 'react';
import { Route } from 'react-router-dom';
import styled from 'styled-components';

import RepositoriesPage from '../../pages/RepositoriesPage';
import logo from '../../../assets/images/octocat.svg';

const LayoutWrapper = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 0px 8fr;
  grid-template-rows: 80px 1fr;
  grid-template-areas:
    'header header header'
    'content content content';
`;

const Content = styled.main`
  grid-area: content;
  padding: 4rem 4rem;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  grid-area: header;
  padding: 0 1rem;
  height: 5rem;
  color: white;
  background-color: rgba(0, 0, 0, 0.85);

  span {
    border-bottom: 5px solid #f42b52;
  }
`;

const LogoImg = styled.img`
  width: 2.6rem;
`;

const LogoContent = styled.div`
  display: flex;
  align-items: center;
  h1 {
    color: white;
    margin: 0;
  }
`;

const DefaultLayout = () => (
  <LayoutWrapper>
    <Header>
      <LogoContent>
        <LogoImg src={logo} alt="logo" />
        &nbsp;
        <h1>GitHub</h1>
      </LogoContent>
      <div>
        <span>Olá, Juliana</span>
      </div>
    </Header>
    <Content>
      <Route path="/" component={RepositoriesPage} />
    </Content>
  </LayoutWrapper>
);

export default DefaultLayout;