// import { useState } from "react";
import { useCallback, useMemo, useState } from "react";
import SyncLoader from "react-spinners/SyncLoader";
import { useTheme } from "styled-components";

import { useGlobalContext } from "../context/appContext";
import useCurrentViewPort from "../hooks/useCurrentViewPort";
import { Wrapper } from "../styles/Jobs.styles";
import JobCard from "./JobCard";
import Draggable from "./Draggable";

const CARD_HEIGHT = 460;

const Jobs = () => {
  const { jobs, isLoading } = useGlobalContext();
  const theme = useTheme();
  const { width: vw, vmin } = useCurrentViewPort();
  const [dragOrder, setDragOrder] = useState(jobs);
  const [draggedCardIndex, setDraggedCardIndex] = useState(null);
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

  // get draggedCardIndex in jobs array --> depending on vw and translation
  // calculate over which card user dragged (using card width, height, gap)
  // add scrollX to translateX and same for Y

  const handleDrag = useCallback(
    (translation, id) => {
      const delta = {
        x: Math.round(translation.x / cardWidth),
        y: Math.round(translation.y / CARD_HEIGHT),
      };
    },
    [cardWidth]
  );

  const handleDrop = useCallback(() => {}, []);

  return (
    <Wrapper cardHeight={CARD_HEIGHT}>
      {!isLoading && jobs?.length === 0 && (
        <p>You have no job applications yet.</p>
      )}
      {!isLoading && jobs?.length > 0 && (
        <>
          <div id="jobs-container">
            {jobs.map((job) => (
              <div key={job._id} id={job._id} className="job-container">
                <Draggable onDrag={handleDrag} onDrop={handleDrop} id={job._id}>
                  <JobCard {...job} cardHeight={CARD_HEIGHT} />
                </Draggable>
              </div>
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
