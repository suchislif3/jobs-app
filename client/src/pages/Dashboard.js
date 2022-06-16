import { useEffect, useRef } from "react";
import JobForm from "../components/JobForm";
import Jobs from "../components/Jobs";
import { useGlobalContext } from "../context/appContext";

const Dashboard = () => {
  const { fetchJobs, errorMessage } = useGlobalContext();
  const isInitRender = useRef(true);

  useEffect(() => {
    if (isInitRender.current === true) {
      fetchJobs();
      isInitRender.current = false;
    }
  }, [fetchJobs]);

  return (
    <>
      {errorMessage && <p className="error">{errorMessage}</p>}
      <JobForm />
      <Jobs />
    </>
  );
};

export default Dashboard;
