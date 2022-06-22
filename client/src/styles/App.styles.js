import styled, { css } from "styled-components";

export const MainContainer = styled.div`
  width: ${({ theme }) => theme.sizing.fluidWidth};
  max-width: ${({ theme }) => theme.sizing.maxWidth};
  min-height: 100vh;
  margin: 0 auto;
`;

export const Page = styled.div`
  min-height: calc(100vh - 6rem);
  row-gap: 1rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${({ display }) => {
    switch (display) {
      case "centered":
        return css`
          justify-content: center;

          .info,
          .job-interview-img,
          .auth {
            transform: translateY(-6rem);
          }
        `;
      default:
        return css``;
    }
  }}

  .info {
    row-gap: 1rem;
    p {
      margin-bottom: 1.5rem;
    }
  }

  .job-interview-img {
    width: 100%;
    margin-top: 1.5rem;
  }

  .auth {
    .primary-btn {
      margin-top: 10px;
      width: 100%;
    }
    .auth-mode {
      display: flex;
      gap: 10px;
      margin-top: 40px;
    }
  }

  .back {
    align-self: flex-start;
    span {
      display: none;
    }
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    ${({ display }) => {
      switch (display) {
        case "grid":
          return css`
            display: grid;
            align-items: center;
            grid-template-columns: 1fr 1fr;
            column-gap: 2rem;

            .info,
            .job-interview-img,
            .auth {
              transform: translateY(-6rem);
            }
          `;
        default:
          return css``;
      }
    }}
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    .back span {
      display: inline;
    }
  }
`;
