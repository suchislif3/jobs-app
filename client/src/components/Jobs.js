import { useState, useEffect, useRef, useCallback } from "react";
import SyncLoader from "react-spinners/SyncLoader";
import { useTheme } from "styled-components";

import { useGlobalContext } from "../context/appContext";
import { Wrapper } from "../styles/Jobs.styles";
import JobCard from "./JobCard";

const Jobs = () => {
  const {
    jobs,
    isLoading,
    saveJobsOrder,
    saveJobsOrderTimeoutId,
    databaseJobsOrder,
    setSaveJobsOrderTimeoutId,
  } = useGlobalContext();
  const [draggedCardId, setDraggedCardId] = useState(null);
  const [draggedCard, setDraggedCard] = useState(null);
  const [jobCards, setJobCards] = useState(null);
  const [jobsOrder, setJobsOrder] = useState(localStorage.getItem("jobsOrder"));
  const [recentClosest, setRecentClosest] = useState(null);
  const container = useRef(null);
  const throttling = useRef(false);
  const initOrder = useRef(true);
  const theme = useTheme();

  useEffect(() => {
    setJobCards([...document.getElementsByClassName("job-card")]);
  }, [jobs]);

  const handleDebounceSaveJobsOrder = useCallback(
    (newOrder) => {
      clearTimeout(saveJobsOrderTimeoutId);
      setSaveJobsOrderTimeoutId(
        newOrder.toString() !== databaseJobsOrder
          ? setTimeout(() => {
              saveJobsOrder(newOrder);
            }, 5000)
          : null
      );
    },
    [
      databaseJobsOrder,
      saveJobsOrder,
      saveJobsOrderTimeoutId,
      setSaveJobsOrderTimeoutId,
    ]
  );

  useEffect(() => {
    setDraggedCard(document.getElementById(draggedCardId));
  }, [draggedCardId]);

  useEffect(() => {
    const newOrder = jobCards?.map((jobCard) => jobCard.id);
    const newOrderString = newOrder?.toString();
    const jobsOrderString = (jobsOrder || "").toString();
    if (
      newOrder &&
      !initOrder.current &&
      !draggedCard &&
      newOrderString !== jobsOrderString
    ) {
      setJobsOrder(newOrderString);
      localStorage.setItem("jobsOrder", newOrderString);
      handleDebounceSaveJobsOrder(newOrder);
    }
    if (newOrder && initOrder.current) initOrder.current = false;
  }, [draggedCard, handleDebounceSaveJobsOrder, jobCards, jobsOrder]);

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
    // throttling added to prevent back and forth jumping cards:
    // if the cursor gets above the same card while scrolling up to the dragged cards new position
    if (recentClosest?.element === closestElement && throttling.current) {
      return;
    }
    throttling.current = true;
    setRecentClosest(closestElementData);
    setTimeout(() => {
      throttling.current = false;
    }, 1000);
    if (closestElement === draggedCard) {
      return;
    } else if (!closestElementData.after) {
      container.current.insertBefore(draggedCard, closestElement);
    } else {
      const nextSibling = closestElement.nextSibling;
      if (!nextSibling) {
        container.current.appendChild(draggedCard);
      } else {
        container.current.insertBefore(draggedCard, nextSibling);
      }
    }
    draggedCard.scrollIntoView({ behavior: "smooth", block: "nearest" });
    setJobCards([...document.getElementsByClassName("job-card")]);
  };

  return (
    <Wrapper onDragOver={dragOver}>
      {!isLoading && jobs?.length === 0 && (
        <p>You have no job applications yet.</p>
      )}
      {!isLoading && jobs?.length > 0 && (
        <>
          <div ref={container} id="jobs-container">
            {(jobsOrder
              ? [...jobs].sort((a, b) => {
                  return jobsOrder.indexOf(a._id) - jobsOrder.indexOf(b._id);
                })
              : jobs
            ).map((job) => (
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
