import styled from 'styled-components';
import { Container } from '../../styles/shared-styles';

export const StyledHeader = styled.header`
  height: 60px;
  background: var(--surface-e);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.03), 0px 0px 2px rgba(0, 0, 0, 0.06), 0px 2px 6px rgba(0, 0, 0, 0.12);

  ${Container} {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
  }
`;