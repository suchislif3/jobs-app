import styled from "styled-components";

export const Wrapper = styled.nav`
  width: 100%;
  height: 6rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;

  .toolbar {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    .toolbar {
      width: auto;
      gap: 25px;
    }
  }
`;
