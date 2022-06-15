import { useEffect, useRef } from "react";
import Jobs from "../components/Jobs";
import { useGlobalContext } from "../context/appContext";

const Dashboard = () => {
  const { fetchJobs } = useGlobalContext();
  const isInitRender = useRef(true);

  useEffect(() => {
    if (isInitRender.current === true) {
      fetchJobs();
      isInitRender.current = false;
    }
  }, [fetchJobs]);

  return (
    <>
      <h1>Dashboard</h1>
      <Jobs />
    </>
  );
};

export default Dashboard;
