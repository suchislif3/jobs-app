import SyncLoader from "react-spinners/SyncLoader";
import { useTheme } from "styled-components";

import { useGlobalContext } from "../context/appContext";
import { JobsContainer } from "../styles/Jobs.styles";
import JobCard from "./JobCard";

const Jobs = () => {
  const { jobs, isLoading } = useGlobalContext();
  const theme = useTheme();

  return (
    <JobsContainer>
      {!isLoading && jobs?.length === 0 && (
        <p>You have no job applications yet.</p>
      )}
      {!isLoading && jobs?.length > 0 && (
        <>
          <h3>Jobs</h3>
          <div>
            {jobs.map((job) => (
              <JobCard key={job._id} {...job} />
            ))}
          </div>
          <div className="legend">
            <span className="pending">pending</span>
            <span className="interview">interview</span>
            <span className="declined">declined</span>
          </div>
        </>
      )}
      <SyncLoader
        loading={isLoading}
        size={12}
        css={"margin: 50px auto;"}
        color={theme.palette.text}
      />
    </JobsContainer>
  );
};

export default Jobs;
