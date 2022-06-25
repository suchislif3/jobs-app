import SyncLoader from "react-spinners/SyncLoader";
import { useTheme } from "styled-components";

import { useGlobalContext } from "../context/appContext";
import { Wrapper } from "../styles/Jobs.styles";
import JobCard from "./JobCard";

const Jobs = () => {
  const { jobs, isLoading } = useGlobalContext();
  const theme = useTheme();

  return (
    <Wrapper>
      {!isLoading && jobs?.length === 0 && (
        <p>You have no job applications yet.</p>
      )}
      {!isLoading && jobs?.length > 0 && (
        <>
          <div className="jobs-container">
            {jobs.map((job) => (
              <JobCard key={job._id} {...job} />
            ))}
          </div>
        </>
      )}
      <SyncLoader
        loading={isLoading}
        size={12}
        css={"margin: 50px auto;"}
        color={theme.palette.text}
      />
    </Wrapper>
  );
};

export default Jobs;
