import styled, { css } from "styled-components";

export const MainContainer = styled.div`
  width: ${({ theme }) => theme.sizing.fluidWidth};
  max-width: ${({ theme }) => theme.sizing.maxWidth};
  min-width: 200px;
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
  padding: 50px 0;

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

  form,
  .info,
  .auth {
    border-top: 1px dashed ${({ theme }) => theme.palette.primary.main};
    border-bottom: 1px dashed ${({ theme }) => theme.palette.primary.main};
  }

  form {
    padding: 2% 0;
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
      border-radius: ${({ theme }) => theme.shape.borderRadius.main};
    }
  }

  .info {
    margin-top: 40px;
    padding: 8% 0;
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
    padding: 4% 0;
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

  @media (min-width: ${({ theme }) => `${theme.breakpoints.md}px`}) {
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
  @media (min-width: ${({ theme }) => `${theme.breakpoints.sm}px`}) {
    .back span {
      display: inline;
    }
  }
`;
