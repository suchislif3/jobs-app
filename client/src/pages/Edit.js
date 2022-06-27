import { useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import SyncLoader from "react-spinners/SyncLoader";
import { useTheme } from "styled-components";

import JobForm from "../components/JobForm";
import { useGlobalContext } from "../context/appContext";
import { Page } from "../styles/App.styles";

const Edit = () => {
  const { id: jobId } = useParams();
  const theme = useTheme();
  const {
    errorMessage,
    fetchSingleJob,
    singleJob,
    clearSingleJob,
    setEditComplete,
    setClientErrorMessage,
  } = useGlobalContext();
  const isInitRender = useRef(true);

  useEffect(() => {
    return () => {
      clearSingleJob();
      setEditComplete(false);
      setClientErrorMessage(null);
    };
  }, [clearSingleJob, setClientErrorMessage, setEditComplete]);

  useEffect(() => {
    if (isInitRender.current === true) {
      fetchSingleJob(jobId);
      isInitRender.current = false;
    }
  }, [fetchSingleJob, jobId]);

  return (
    <Page>
      <Link to="/dashboard" className="back btn secondary-btn with-icon">
        <MdOutlineArrowBackIosNew />
        <span>Back to jobs</span>
      </Link>
      {errorMessage && <p className="error">{errorMessage}</p>}
      {singleJob && <JobForm jobId={jobId} />}
      <SyncLoader
        loading={!singleJob}
        size={12}
        css={"margin: 50px auto;"}
        color={theme.palette.text}
      />
    </Page>
  );
};

export default Edit;
