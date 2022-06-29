import styled from "styled-components";

export const Wrapper = styled.article`
  position: relative;
  background-color: ${({ theme }) => theme.palette.common.white};
  padding: max(2vmin, 25px) 2vmin;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* background-color: ${({ theme, status }) =>
    `${theme.palette.jobStatus[status]}80`}; */
  border: 1px dashed ${({ theme }) => theme.palette.primary.main};
  width: 90vw;
  height: ${({ height }) => `${height}px`};
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;

  @media (min-width: ${({ theme }) => `${theme.breakpoints.sm}px`}) {
    width: calc(
      (min(90vw, ${({ theme }) => theme.sizing.maxWidth}) - 2vmin) / 2
    );
  }
  @media (min-width: ${({ theme }) => `${theme.breakpoints.md}px`}) {
    width: calc(
      (min(90vw, ${({ theme }) => theme.sizing.maxWidth}) - 2 * 2vmin) / 3
    );
  }

  h5 {
    margin-bottom: 5%;
    text-align: center;
    word-break: break-word;
  }
  .item {
    display: flex;
    align-items: center;
    gap: 5%;
    margin-top: 2%;
    .icon {
      flex-shrink: 0;
    }
  }
  .ellipsis {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .ellipsis-multiline {
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .status-bar {
    height: 30px;
    width: 100%;
    margin: 30px 0;
    border-radius: 15px;
    border: 1px solid ${({ theme }) => theme.palette.primary.main};
    display: flex;
    justify-content: ${({ status }) => {
      switch (status) {
        case "pending":
          return "center";
        case "declined":
          return "flex-start";
        case "interview":
          return "flex-end";
        default:
          return "center";
      }
    }};
  }
  .status-base {
    height: 28px;
    width: fit-content;
    border-radius: 14px;
    display: flex;
    padding: 0 20px;
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
  .url {
    line-height: 1;
    position: absolute;
    top: 1vmin;
    right: 1vmin;
    /* transform: translate(50%, -50%); */
  }
  .job-actions {
    display: flex;
    justify-content: space-between;
  }
  .created-at {
    line-height: 1;
    font-size: ${({ theme }) => theme.typography.fontSize.small};
    position: absolute;
    left: 50%;
    bottom: 5px;
    transform: translateX(-50%);
    white-space: nowrap;
  }
`;
