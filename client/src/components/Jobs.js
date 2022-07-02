import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import SyncLoader from "react-spinners/SyncLoader";
import { useTheme } from "styled-components";

import { useGlobalContext } from "../context/appContext";
import useCurrentViewPort from "../hooks/useCurrentViewPort";
import { Wrapper, JobContainer } from "../styles/Jobs.styles";
import JobCard from "./JobCard";
import Draggable from "./Draggable";

const CARD_HEIGHT = 460;

const Jobs = () => {
  const theme = useTheme();
  const { width: vw, vmin } = useCurrentViewPort();
  const { jobs, isLoading } = useGlobalContext();
  const [order, setOrder] = useState(null);
  // const [dragOrder, setDragOrder] = useState(null);
  // const sortedJobs = useMemo(() => sortJobs(jobs, order), [jobs, order]);
  const throttling = useRef(false);
  // const [draggedCardIndex, setDraggedCardIndex] = useState(null);

  const columns = useMemo(() => {
    if (vw >= theme.breakpoints.md) return 3;
    if (vw >= theme.breakpoints.sm) return 2;
    return 1;
  }, [theme.breakpoints.md, theme.breakpoints.sm, vw]);
  const gap = useMemo(() => 0.02 * vmin, [vmin]);

  const cardWidth = useMemo(() => {
    const maxWidth = Number(theme.sizing.maxWidth.slice(0, -2));
    const result =
      (Math.min(0.9 * vw, maxWidth) - (columns - 1) * gap) / columns;
    return result;
  }, [columns, gap, theme.sizing.maxWidth, vw]);

  useEffect(() => {
    if (jobs) {
      const newOrder = jobs.map((job) => job._id);
      setOrder(newOrder);
    }
  }, [jobs]);

  // get draggedCardIndex in jobs array --> depending on vw and translation
  // calculate over which card user dragged (using card width, height, gap)
  // add scrollX to translateX and same for Y

  /*  function sortJobs(unsortedJobs, order) {
    let sortedJobs = [];
    for (let i = 0; i < unsortedJobs?.length; i++) {
      sortedJobs[order?.indexOf(unsortedJobs[i]._id)] = unsortedJobs[i];
    }
    return sortedJobs;
  } */

  const isValid = useCallback(
    (index, delta) => {
      if (
        delta.x >= -index % 3 &&
        delta.y >= -Math.floor(index / 3) &&
        delta.x <= Math.min(2 - (index % 3), jobs.length - 1 - index) &&
        delta.y <= Math.floor((jobs.length - 1 - index) / 3) &&
        (delta.x || delta.y) !== 0
      )
        return true;
      return false;
    },
    [jobs?.length]
  );

  const handleDrag = useCallback(
    ({ translation, id: jobId }) => {
      if (throttling.current) {
        return;
      }
      throttling.current = true;
      setTimeout(() => {
        throttling.current = false;
        const delta = {
          x: Math.round(translation.x / cardWidth),
          y: Math.round(translation.y / CARD_HEIGHT),
        };
        const jobIndex = order.indexOf(jobId);
        if (!isValid(jobIndex, delta)) return;
        const newOrder = order.filter((id) => id !== jobId);
        const newJobIndex = jobIndex + delta.x + delta.y * 3;
        newOrder.splice(newJobIndex, 0, jobId);
        setOrder(newOrder);
      }, 50);
    },
    [cardWidth, isValid, order]
  );

  // const handleDrop = useCallback(() => {
  //   setOrder(dragOrder);
  //   setDragOrder(null);
  // }, [dragOrder]);

  return (
    <Wrapper>
      {!isLoading && jobs?.length === 0 && (
        <p>You have no job applications yet.</p>
      )}
      {!isLoading && jobs?.length > 0 && (
        <>
          <div id="jobs-container">
            {jobs.map((job) => {
              const index = order?.indexOf(job._id);
              const gridColumn = 1 + (index % 3);
              const gridRow = Math.floor(index / 3) + 1;
              return (
                <JobContainer
                  key={job._id}
                  id={job._id}
                  cardHeight={CARD_HEIGHT}
                  gridPosition={{ gridColumn, gridRow }}
                >
                  <Draggable
                    onDrag={handleDrag}
                    id={job._id}
                    // onDrop={handleDrop}
                  >
                    <JobCard {...job} cardHeight={CARD_HEIGHT} />
                  </Draggable>
                </JobContainer>
              );
            })}
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
