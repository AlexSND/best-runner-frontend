import React from 'react';
import GlobalStyles from './styles/global-styles';
import { Header } from './components/Header/Header';
import { Route, Routes } from 'react-router-dom';
import { MainPage } from './pages/MainPage/MainPage';
import { CreatePage } from './pages/CreatePage/CreatePage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';

export const App = () => {
  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<MainPage/>} />
        <Route path="/create" element={<CreatePage/>} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
      <GlobalStyles/>
    </>
  );
};