import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from "react";

const POSITION = { x: 0, y: 0 };
const TRANSITION_INTERVAL = 300;

const Draggable = ({ children, onDrag, onDrop, id }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [origin, setOrigin] = useState(POSITION);
  const [translation, setTranslation] = useState(POSITION);
  const [zIndex, setZIndex] = useState(1);
  const zIndexTimeoutRef = useRef(null);

  const handleMouseDown = useCallback(({ clientX, clientY }) => {
    setIsDragging(true);
    setOrigin({ x: clientX, y: clientY });
  }, []);

  const handleMouseMove = useCallback(
    ({ clientX, clientY }) => {
      const translation = { x: clientX - origin.x, y: clientY - origin.y };
      setTranslation(translation);
      onDrag({ translation, id });
    },
    [origin, onDrag, id]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    onDrop();
  }, [onDrop]);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);

      setTranslation(POSITION);
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  useEffect(() => {
    function startTimeOut() {
      zIndexTimeoutRef.current = setTimeout(() => {
        setZIndex(1);
      }, TRANSITION_INTERVAL);
    }
    function stopTimeout() {
      clearTimeout(zIndexTimeoutRef.current);
    }

    if (!isDragging && !zIndexTimeoutRef.current) {
      startTimeOut();
      return;
    }
    if (isDragging) {
      stopTimeout();
      zIndexTimeoutRef.current = null;
      setZIndex(2);
      return;
    }
  }, [isDragging]);

  let styles = useMemo(
    () => ({
      cursor: isDragging ? "-webkit-grabbing" : "-webkit-grab",
      transform: `translate(${translation.x}px, ${translation.y}px)`,
      transition: isDragging ? "none" : `transform ${TRANSITION_INTERVAL}ms`,
      position: isDragging ? "absolute" : "relative",
      zIndex: zIndex,
    }),
    [isDragging, translation, zIndex]
  );

  return (
    <div style={styles} onMouseDown={handleMouseDown}>
      {children}
    </div>
  );
};

export default Draggable;
