import { useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import JobForm from "../components/JobForm";
import { useGlobalContext } from "../context/appContext";

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
    <>
      <Link to="/dashboard">back to jobs</Link>
      {errorMessage && <p className="error">{errorMessage}</p>}
      <h4>Edit</h4>
      {!isLoading && singleJob && <JobForm jobId={jobId} />}
    </>
  );
};

export default Edit;
