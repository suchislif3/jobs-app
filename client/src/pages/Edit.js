import { useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import JobForm from "../components/JobForm";
import { useGlobalContext } from "../context/appContext";
import { Page } from "../styles/App.styles";

const Edit = () => {
  const { id: jobId } = useParams();
  const { isLoading, errorMessage, fetchSingleJob, singleJob } =
    useGlobalContext();
  const isInitRender = useRef(true);

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
      {!isLoading && singleJob && <JobForm jobId={jobId} />}
    </Page>
  );
};

export default Edit;
