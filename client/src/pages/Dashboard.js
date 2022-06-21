import { useState } from "react";
import { useEffect, useRef } from "react";
import JobForm from "../components/JobForm";
import Jobs from "../components/Jobs";
import { useGlobalContext } from "../context/appContext";

const Dashboard = () => {
  const { fetchJobs, errorMessage } = useGlobalContext();
  const isInitRender = useRef(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (isInitRender.current === true) {
      fetchJobs();
      isInitRender.current = false;
    }
  }, [fetchJobs]);

  return (
    <>
      {errorMessage && <p className="error">{errorMessage}</p>}
      {showForm && <JobForm showForm={showForm} setShowForm={setShowForm} />}
      <button
        onClick={() => {
          setShowForm((prev) => !prev);
        }}
      >
        {showForm ? "Hide form" : "Add new job"}
      </button>
      <Jobs />
    </>
  );
};

export default Dashboard;
