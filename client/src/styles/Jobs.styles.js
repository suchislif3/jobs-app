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
    display: flex;
    flex-direction: column;
    gap: 5vmin;
  }

  .job-container {
    position: relative;
    height: ${({ cardHeight }) => `${cardHeight}px`};
  }

  @media (min-width: ${({ theme }) => `${theme.breakpoints.sm}px`}) {
    #jobs-container {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 2vmin;
    }
  }
  @media (min-width: ${({ theme }) => `${theme.breakpoints.md}px`}) {
    #jobs-container {
      grid-template-columns: repeat(3, 1fr);
    }
  }
`;
