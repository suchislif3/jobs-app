import SyncLoader from "react-spinners/SyncLoader";
import { useTheme } from "styled-components";

import { useGlobalContext } from "../context/appContext";

const Jobs = () => {
  const { jobs, isLoading, errorMessage } = useGlobalContext();
  const theme = useTheme();

  return (
    <div>
      <h3>Jobs</h3>
      {errorMessage ? (
        <p className="error">{errorMessage}</p>
      ) : !jobs.length && !isLoading ? (
        <p>You have no job applications yet.</p>
      ) : (
        <div>
          <h4>your job applications</h4>
          {jobs.map((job) => (
            <div key={job}>{job}</div>
          ))}
        </div>
      )}
      <SyncLoader
        loading={isLoading}
        size={12}
        css={"margin: 50px auto;"}
        color={theme.palette.text}
      />
    </div>
  );
};

export default Jobs;
