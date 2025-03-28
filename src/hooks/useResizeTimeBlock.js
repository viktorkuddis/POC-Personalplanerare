import { useEffect } from "react";
import PropTypes from "prop-types";

export function useResizeTimeBlock({
  isResizing,
  stopResizing,
  duration,
  setDuration,
  hourRepresentationOfOnePixel,
  initialMousePositionRight,
  setInitialMousePositionRight,
}) {
  useEffect(() => {

    if (isResizing) {
      //disablear möjligheten att råka markera text:
      document.body.style.userSelect = "none";
      document.body.style.webkitUserSelect = "none";

      // Lägg till eventlyssnare på musen
      document.addEventListener("mousemove", resizing);
      document.addEventListener("mouseup", stopResizing);
    } else {
      //Man får markera text när resizing är avstängd
      document.body.style.userSelect = "auto";
      document.body.style.webkitUserSelect = "auto";
    }

    function resizing(e) {
      if (isResizing) {
        console.log("vi movar");

        //varje gång musen flyttar sig en pixel tar vi reda på diffen
        const oldPosition = initialMousePositionRight;
        const newPosition = e.clientX;

        const positionDiff = newPosition - oldPosition;
        const durationDiff = hourRepresentationOfOnePixel * positionDiff;

        console.log(
          "Diff muspek. Position:", positionDiff, "px |", "Diff duration: ", durationDiff, "h"
        );

        setInitialMousePositionRight(newPosition);
        setDuration(duration + durationDiff);
      }
    }



    return () => {
      // Rensa upp event listeners när komponenten avmonteras eller när resizing slutar
      document.removeEventListener("mousemove", resizing);
      document.removeEventListener("mouseup", stopResizing);
      document.body.style.userSelect = "auto";
      document.body.style.webkitUserSelect = "auto";
    };
  }, [
    duration,
    hourRepresentationOfOnePixel,
    initialMousePositionRight,
    isResizing,
    setDuration,
    setInitialMousePositionRight,
    stopResizing,
  ]);
}
