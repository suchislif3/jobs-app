import styled, { css } from "styled-components";

export const MainContainer = styled.div`
  width: ${({ theme }) => theme.sizing.fluidWidth};
  max-width: ${({ theme }) => theme.sizing.maxWidth};
  min-height: 100vh;
  margin: 0 auto;
`;

export const Page = styled.div`
  min-height: calc(100vh - 6rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 1rem;

  .info,
  img,
  form {
    transform: translateY(-6rem);
  }

  .info {
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
  }

  img {
    width: 100%;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    ${(props) => {
      switch (props.grid) {
        case true:
          return css`
            display: grid;
            grid-template-columns: 1fr 1fr;
            column-gap: 2rem;
          `;
        default:
          return css``;
      }
    }}
  }
`;
