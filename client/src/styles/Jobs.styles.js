import styled from "styled-components";

export const JobsContainer = styled.div`
  .legend {
    display: flex;
    gap: 1rem;
    margin-top: 20px;
  }
  .pending,
  .interview,
  .declined {
    padding: 3px;
  }
  .pending {
    background-color: ${({ theme }) => theme.palette.jobStatus.pending};
  }
  .interview {
    background-color: ${({ theme }) => theme.palette.jobStatus.interview};
  }
  .declined {
    background-color: ${({ theme }) => theme.palette.jobStatus.declined};
  }
`;
