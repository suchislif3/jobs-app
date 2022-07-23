import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;

  h3 {
    margin-bottom: 2%;
  }

  #jobs-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 5vmin;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    #jobs-container {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 2vmin;
    }
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    #jobs-container {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }
`;
