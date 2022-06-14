import React, { useEffect } from "react";
import SyncLoader from "react-spinners/SyncLoader";
import { useTheme } from "styled-components";

import { useGlobalContext } from "../context/appContext";

const Jobs = () => {
  const { jobs, isLoading } = useGlobalContext();
  const theme = useTheme();

  const { fetchJobs } = useGlobalContext();

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div>
      <h3>Jobs</h3>
      {!jobs.length && !isLoading ? (
        <p>You have no job applications yet.</p>
      ) : (
        <p>your job applications</p>
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
