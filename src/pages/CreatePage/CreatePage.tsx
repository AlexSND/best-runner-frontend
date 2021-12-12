import React from 'react';
import { Card } from 'primereact/card';
import { Container } from '../../styles/shared-styles';
import { CreateForm } from '../../components/CreateForm/CreateForm';

export const CreatePage = () => {
  return (
    <Container>
      <h1>Добавить новую тренировку</h1>
      <Card>
        <CreateForm />
      </Card>
    </Container>
  );
};