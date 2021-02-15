import { createGlobalStyle } from 'styled-components'

import github from '../assets/images/Github.svg'

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    background: #E5E5E5 url(${github}) no-repeat 70% top;
    -webkit-font-smoothing: antialiased;
    color: #3a3a3a;
  }

  body, input, button {
    font-family: Roboto, sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 21px;
  }

  #root {
    max-width: 970px;
    margin: 0 auto;
    padding: 40px 20px;
  }
`

export default GlobalStyle
