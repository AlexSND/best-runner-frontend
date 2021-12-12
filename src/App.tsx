import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import GlobalStyles from './styles/global-styles';
import { Header } from './components/Header/Header';
import { MainPage } from './pages/MainPage/MainPage';
import { CreatePage } from './pages/CreatePage/CreatePage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { fetchTrainings, fetchTrainingsTypes, resetState } from './redux/actions';

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTrainings());
    dispatch(fetchTrainingsTypes());
    return () => {
      dispatch(resetState());
    };
  }, []);

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