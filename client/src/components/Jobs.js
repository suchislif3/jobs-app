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
  // const [order, setOrder] = useState(null);
  const [cardPositions, setCardPositions] = useState({});

  const [dragOrder, setDragOrder] = useState(null);
  // const sortedJobs = useMemo(() => sortJobs(jobs, order), [jobs, order]);
  const throttling = useRef(false);
  const [draggedCardId, setDraggedCardId] = useState(null);
  // let cardPositions = useMemo(() => {
  //   let newCardPositions = {};
  //     for (let i = 0; i < jobs.length; i++) {
  //       newCardPositions[jobs[i]._id] = getGridPosition(i);
  //     }
  //   return newCardPositions
  // }, [jobs])

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
    if (dragOrder) {
      for (let i = 0; i < dragOrder.length; i++) {
        if (dragOrder[i] !== draggedCardId) {
          setCardPositions((prev) => ({
            ...prev,
            [dragOrder[i]]: getGridPosition(i),
          }));
        }
      }
    }
  }, [dragOrder, draggedCardId]);

  useEffect(() => {
    if (jobs) {
      // const newOrder = jobs.map((job) => job._id);
      // setOrder(newOrder);
      let newCardPositions = {};
      for (let i = 0; i < jobs.length; i++) {
        newCardPositions[jobs[i]._id] = getGridPosition(i);
      }
      setCardPositions(newCardPositions);
      console.log(newCardPositions);
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

  function getGridPosition(index) {
    const gridColumn = 1 + (index % 3);
    const gridRow = Math.floor(index / 3) + 1;
    return { gridColumn, gridRow };
  }

  // const getIndex = (id) => {
  //     return (
  //       (cardPositions[id].gridRow - 1) * 3 + cardPositions[id].gridColumn - 1
  //     );
  //   }

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
      if (!draggedCardId) setDraggedCardId(jobId);
      setTimeout(() => {
        throttling.current = false;
        const delta = {
          x: Math.round(translation.x / cardWidth),
          y: Math.round(translation.y / CARD_HEIGHT),
        };
        const jobIndex =
          (cardPositions[jobId].gridRow - 1) * 3 +
          cardPositions[jobId].gridColumn -
          1;
        if (!isValid(jobIndex, delta)) return console.log("NOT VALID");
        let newDragOrder = jobs.map((job) => job._id);
        newDragOrder = newDragOrder.filter((id) => id !== jobId);
        const newJobIndex = jobIndex + delta.x + delta.y * 3;
        newDragOrder.splice(newJobIndex, 0, jobId);
        setDragOrder(newDragOrder);
        // setCardPositions(prevPositions => ({...prevPositions}));
      }, 50);
    },
    [cardPositions, cardWidth, draggedCardId, isValid, jobs]
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
      {!isLoading && Object.keys(cardPositions)?.length > 0 && (
        <>
          <div id="jobs-container">
            {jobs.map((job) => {
              return (
                <JobContainer
                  key={job._id}
                  id={job._id}
                  cardHeight={CARD_HEIGHT}
                  gridPosition={cardPositions[job._id]}
                >
                  <Draggable
                    onDrag={handleDrag}
                    id={job._id}
                    setDraggedCardId={setDraggedCardId}
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
