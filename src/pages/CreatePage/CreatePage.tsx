import React from 'react';
import { Card } from 'primereact/card';
import { Container, ErrorMessage } from '../../styles/shared-styles';
import { CreateForm } from '../../components/CreateForm/CreateForm';
import { AppState } from '../../redux/types';
import { useSelector } from 'react-redux';
import { Preloader } from '../../components/Preloader/Preloader';

export const CreatePage = () => {
  const { error, loading, types } = useSelector((state: AppState) => state);

  if (error) {
    return (
      <Container>
        <ErrorMessage>
          { error }
        </ErrorMessage>
      </Container>
    );
  }

  if (loading || types.length === 0) {
    return (
      <Preloader/>
    );
  }

  return (
    <Container>
      <h1>Добавить новую тренировку</h1>
      <Card>
        <CreateForm />
      </Card>
    </Container>
  );
};