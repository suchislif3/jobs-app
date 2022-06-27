import { useState } from "react";
import { useEffect, useRef } from "react";
import JobForm from "../components/JobForm";
import Jobs from "../components/Jobs";
import { useGlobalContext } from "../context/appContext";
import { Page } from "../styles/App.styles";

const Dashboard = () => {
  const { fetchJobs, errorMessage, jobs, setClientErrorMessage } =
    useGlobalContext();
  const isInitRender = useRef(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (isInitRender.current === true && !jobs) {
      fetchJobs();
      isInitRender.current = false;
    }
  }, [fetchJobs, jobs]);

  const cancel = () => {
    setClientErrorMessage(null);
    setShowForm(false);
  };

  const handleClick = () => {
    showForm ? cancel() : setShowForm(true);
  };

  return (
    <Page>
      {errorMessage && <p className="error">{errorMessage}</p>}
      {showForm && <JobForm showForm={showForm} setShowForm={setShowForm} />}
      <button
        onClick={handleClick}
        className={`btn ${
          showForm ? "cancel-btn" : "secondary-btn add-new-btn"
        }`}
      >
        {showForm ? "Cancel" : "Add new job"}
      </button>
      {!errorMessage && <Jobs />}
    </Page>
  );
};

export default Dashboard;
