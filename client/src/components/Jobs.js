import { useState } from "react";
import SyncLoader from "react-spinners/SyncLoader";
import { useTheme } from "styled-components";

import { useGlobalContext } from "../context/appContext";
import { Wrapper } from "../styles/Jobs.styles";
import JobCard from "./JobCard";

const Jobs = () => {
  const { jobs, isLoading } = useGlobalContext();
  const [draggedCardId, setDraggedCardId] = useState(null);
  const theme = useTheme();

  const drop = (e) => {
    e.preventDefault();
    const jobCard = document.getElementById(draggedCardId);
    jobCard.style.visibility = "visible";
    setDraggedCardId(null);
  };

  const dragOver = (e) => {
    e.preventDefault();
    const container = document.getElementById("jobs-container");
    const afterElement = getAfterElement(container, e.clientX, e.clientY);
    const draggedCard = document.getElementById(draggedCardId);
    // const target = e.target.closest(".job-card");
    if (afterElement == null) {
      container.appendChild(draggedCard);
    } else if (afterElement === draggedCard) {
      return;
    } else {
      container.insertBefore(draggedCard, afterElement);
    }
  };

  // const dragOver = (e) => {
  //   e.preventDefault();
  //   const container = document.getElementById("jobs-container");
  //   const target = e.target;
  //   const jobCard = document.getElementById(draggedCard);
  //   if (target.classList.contains("job-card")) {
  //     container.insertBefore(jobCard, target);
  //   }
  // };

  const getAfterElement = (container, x, y) => {
    const jobCards = [...container.querySelectorAll(".job-card")];
    return jobCards.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offsetY = y - box.top - box.height / 2;
        const offsetX = x - box.left - box.width / 2;
        console.log({ offsetX, offsetY });
        if (
          offsetY < 0 &&
          offsetY > closest.offsetY &&
          offsetX < 0 &&
          offsetX > closest.offsetX
        ) {
          return { offsetY: offsetY, offsetX: offsetX, element: child };
        } else {
          return closest;
        }
      },
      { offsetX: Number.NEGATIVE_INFINITY, offsetY: Number.NEGATIVE_INFINITY }
    ).element;
  };

  return (
    <Wrapper onDrop={drop} onDragOver={dragOver}>
      {!isLoading && jobs?.length === 0 && (
        <p>You have no job applications yet.</p>
      )}
      {!isLoading && jobs?.length > 0 && (
        <>
          <div id="jobs-container">
            {jobs.map((job) => (
              <JobCard
                key={job._id}
                {...job}
                setDraggedCardId={setDraggedCardId}
              />
            ))}
          </div>
        </>
      )}
      <SyncLoader
        loading={isLoading}
        size={12}
        css={"margin: 50px auto;"}
        color={theme.palette.text}
      />
    </Wrapper>
  );
};

export default Jobs;
