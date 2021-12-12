import { createGlobalStyle } from 'styled-components';
import 'primereact/resources/primereact.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/bootstrap4-dark-blue/theme.css';
import 'primeflex/primeflex.css';

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap');

  body {
    margin: 0;
    box-sizing: border-box;
    font-family: 'Open Sans', sans-serif;
    color: var(--text-color);
    background-color: var(--surface-b);
  }

  *, *:after, *:before {
    box-sizing: inherit;
  }

  a {
    text-decoration: none;
  }

  .disabled {
    pointer-events: none;
  }
`;

export default GlobalStyles;