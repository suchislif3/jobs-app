import styled from "styled-components";

export const Wrapper = styled.nav`
  width: 100%;
  min-height: 6rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 10px;

  .logo,
  img {
    height: 4rem;
    max-width: 100%;
  }

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
