import styled from "styled-components";

export const MainContainer = styled.div`
  width: ${({ theme }) => theme.sizing.fluidWidth};
  max-width: ${({ theme }) => theme.sizing.maxWidth};
  margin: 0 auto;
`;
