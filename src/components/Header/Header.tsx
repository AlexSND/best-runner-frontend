import React from 'react';
import { Button } from 'primereact/button';
import { Container } from '../../styles/shared-styles';
import { StyledHeader } from './style';
import { Logo } from '../Logo/Logo';

export const Header = () => {
  return (
    <StyledHeader>
      <Container>
        <Logo/>
        <Button label="Добавить" icon="pi pi-plus p-button-success" />
      </Container>
    </StyledHeader>
  );
};