import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Container } from '../../styles/shared-styles';
import { StyledHeader } from './style';
import { Logo } from '../Logo/Logo';
import { useSelector } from 'react-redux';
import { AppState } from '../../redux/types';

export const Header = () => {
  const { error, loading } = useSelector((state: AppState) => state);

  return (
    <StyledHeader>
      <Container>
        <Logo/>
        <Link to="/create" className={ (!!error || loading) ? 'disabled' : '' }>
          <Button label="Добавить" icon="pi pi-plus p-button-success" disabled={ !!error || loading }/>
        </Link>
      </Container>
    </StyledHeader>
  );
};