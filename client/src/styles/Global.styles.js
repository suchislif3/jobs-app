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
    line-height: 1.75;
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
    margin-top: 0;
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

  .btn {
    cursor: pointer;
    border: none;
    border-radius: ${({ theme }) => theme.shape.borderRadius};
    transition: all 0.3s ease;
    display: inline-block;
  }
  
  .primary-btn {
    background-color: ${({ theme }) => theme.palette.primary.main};
    color: ${({ theme }) => theme.palette.primary.contrastText};
    padding: 0.5rem 1rem;
    font-size: ${({ theme }) => theme.typography.fontSize.main};
    letter-spacing: ${({ theme }) => theme.typography.letterSpacing.large};
    :hover {
      background-color: ${({ theme }) => theme.palette.primary.dark};
    }
  }
  
  .secondary-btn {
    background-color: ${({ theme }) => theme.palette.secondary.main};
    color: ${({ theme }) => theme.palette.secondary.contrastText};
    padding: 0.35em 0.7rem;
    font-size: ${({ theme }) => theme.typography.fontSize.small};
    letter-spacing: ${({ theme }) => theme.typography.letterSpacing.main};
    :hover {
      background-color: ${({ theme }) => theme.palette.secondary.dark};
    }
  }

  .reset-btn {
    background-color: ${({ theme }) => theme.palette.error};
    color: ${({ theme }) => theme.palette.secondary.contrastText};
    padding: 0.35em 0.7rem;
    font-size: ${({ theme }) => theme.typography.fontSize.small};
    letter-spacing: ${({ theme }) => theme.typography.letterSpacing.main};
    :hover {
      filter: brightness(90%)
    }
  }

  form {
    width: 100%;
    max-width: ${({ theme }) => theme.sizing.fixedWidth};
    h4 {
      text-align: center; 
    }
  }

  .form-input {
    margin: 12px 0;
    label {
      display: block;
      font-size: ${({ theme }) => theme.typography.fontSize.small};
    }
    input,
    select {
      width: 100%;
      padding: 0.375rem 0.75rem;
      border: 1px solid ${({ theme }) => theme.palette.grey.g400};
      border-radius: ${({ theme }) => theme.shape.borderRadius};
    }
  }

  .user,
  .logout,
  .back {
    display: flex;
    align-items: center;
    gap: 10px;
    width: fit-content;
  }

  .form-btns {
    display: flex;
    flex-direction: column;
    width: fit-content;
    gap: 10px;
  }

  /* .user,
  .logout,
  .back {
    width: fit-content;
  } */

  .error {
    color: ${({ theme }) => theme.palette.error};
  }

  .success {
    color: ${({ theme }) => theme.palette.success};
    margin-top: 10px;
  }
`;
