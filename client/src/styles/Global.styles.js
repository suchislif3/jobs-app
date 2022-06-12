import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Lato&display=swap');
  
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: ${({ theme }) => theme.fonts.main};
    border-radius: ${({ theme }) => theme.borderRadius};
  }
  
  html {
    height: 100%;
  }
  
  body {
    background-color: ${({ theme }) => theme.palette.common.white};
    color: ${({ theme }) => theme.palette.common.black};
    display: flex;
    justify-content: center;
    padding: 0 20px;
  }
  
  a {
    text-decoration: none;
  }
`;
