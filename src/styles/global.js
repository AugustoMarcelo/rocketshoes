import { createGlobalStyle } from 'styled-components';

import 'react-toastify/dist/ReactToastify.css';
import background from '../assets/images/background.svg';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    background: #42A5F5 url(${background}) no-repeat center top;
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
  }

  #root {
    max-width: 1020px;
    width: 95%;
    margin: 0 auto;
    padding: 0 0 50px;
  }

  button {
    cursor: pointer;
  }
`;
