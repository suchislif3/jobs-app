import { useState, useEffect } from "react";

const getWidth = () =>
  window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth;

const getHeight = () =>
  window.innerHeight ||
  document.documentElement.clientHeight ||
  document.body.clientHeight;

const getVmin = () => Math.min(getWidth(), getHeight());
const getVmax = () => Math.max(getWidth(), getHeight());

function useCurrentViewPort() {
  let [width, setWidth] = useState(getWidth());
  let [height, setHeight] = useState(getHeight());
  let [vmin, setVmin] = useState(getVmin());
  let [vmax, setVmax] = useState(getVmax());

  useEffect(() => {
    let timeoutId = null;
    const resizeListener = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setWidth(getWidth());
        setHeight(getHeight());
        setVmin(getVmin());
        setVmax(getVmax());
      }, 150);
    };
    window.addEventListener("resize", resizeListener);

    return () => {
      window.removeEventListener("resize", resizeListener);
    };
  }, []);

  return { width, height, vmin, vmax };
}

export default useCurrentViewPort;
