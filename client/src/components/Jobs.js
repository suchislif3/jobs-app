import { useState, useEffect, useRef } from "react";
import SyncLoader from "react-spinners/SyncLoader";
import { useTheme } from "styled-components";

import { useGlobalContext } from "../context/appContext";
import { Wrapper } from "../styles/Jobs.styles";
import JobCard from "./JobCard";

const Jobs = () => {
  const { jobs, isLoading } = useGlobalContext();
  const [draggedCardId, setDraggedCardId] = useState(null);
  const [draggedCard, setDraggedCard] = useState(null);
  const [jobCards, setJobCards] = useState(null);
  const container = useRef(null);
  const theme = useTheme();

  useEffect(() => {
    setJobCards([...document.getElementsByClassName("job-card")]);
  }, []);

  useEffect(() => {
    setDraggedCard(document.getElementById(draggedCardId));
  }, [draggedCardId]);

  const drop = (e) => {
    e.preventDefault();
    draggedCard.style.visibility = "visible";
    draggedCard.style.opacity = "1";
    setDraggedCardId(null);
  };

  const dragOver = (e) => {
    e.preventDefault();

    const closestElementData = getClosestElementData(e.clientX, e.clientY);
    const closestElement = closestElementData.element;

    if (closestElement === draggedCard) {
      console.log("SELF");
      return;
    } else if (!closestElementData.after) {
      container.current.insertBefore(draggedCard, closestElement);
      console.log("BEFORE");
    } else {
      const nextSibling = closestElement.nextSibling;
      if (!nextSibling) {
        console.log("APPEND");
        container.current.appendChild(draggedCard);
      } else {
        console.log("-----AFTER-----");
        container.current.insertBefore(draggedCard, nextSibling);
      }
    }
    draggedCard.scrollIntoView({ behavior: "smooth", block: "nearest" });
    console.log(closestElement.firstChild.firstChild.innerText);
    setJobCards([...document.getElementsByClassName("job-card")]);
  };

  const getClosestElementData = (x, y) => {
    return jobCards.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offsetY = y - box.top - box.height / 2;
        const offsetX = x - box.left - box.width / 2;
        if (
          Math.abs(offsetY) <= Math.abs(closest.offsetY) &&
          Math.abs(offsetX) <= Math.abs(closest.offsetX)
        ) {
          return {
            offsetY: offsetY,
            offsetX: offsetX,
            element: child,
            after: jobCards.indexOf(child) > jobCards.indexOf(draggedCard),
          };
        } else {
          return closest;
        }
      },
      { offsetX: Number.POSITIVE_INFINITY, offsetY: Number.POSITIVE_INFINITY }
    );
  };

  return (
    <Wrapper onDragOver={dragOver}>
      {!isLoading && jobs?.length === 0 && (
        <p>You have no job applications yet.</p>
      )}
      {!isLoading && jobs?.length > 0 && (
        <>
          <div ref={container} id="jobs-container">
            {jobs.map((job) => (
              <JobCard
                key={job._id}
                {...job}
                setDraggedCardId={setDraggedCardId}
                drop={drop}
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
