import React from 'react';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Wrapper } from './style';

export const Preloader = () => (
  <Wrapper>
    <ProgressSpinner />
  </Wrapper>
);