import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    background-color: ${({ theme }) => theme.palette.background};
    color: ${({ theme }) => theme.palette.text};
    font-family: ${({ theme }) => theme.typography.fontFamily.main};
    font-size: ${({ theme }) => theme.typography.fontSize.main};
    font-weight: ${({ theme }) => theme.typography.fontWeight.main};
    border-radius: ${({ theme }) => theme.shape.borderRadius};
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: ${({ theme }) => theme.typography.fontFamily.heading};
    font-weight: ${({ theme }) => theme.typography.fontWeight.heading};
  }

  h1 {
    font-size: ${({ theme }) => theme.typography.fontSize.h1};
  }

  h2 {
    font-size: ${({ theme }) => theme.typography.fontSize.h2};
  }
  
  h3 {
    font-size: ${({ theme }) => theme.typography.fontSize.h3};
  }
  
  h4 {
    font-size: ${({ theme }) => theme.typography.fontSize.h4};
  }
  
  h5 {
    font-size: ${({ theme }) => theme.typography.fontSize.h5};
  }
  
  h6 {
    font-size: ${({ theme }) => theme.typography.fontSize.h6};
  }
  
  a {
    text-decoration: none;
  }
`;
