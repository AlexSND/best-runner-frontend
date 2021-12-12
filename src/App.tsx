import React from 'react';
import GlobalStyles from './styles/global-styles';
import { Header } from './components/Header/Header';

export const App = () => {
  return (
    <>
      <Header/>
      <GlobalStyles/>
    </>
  );
};