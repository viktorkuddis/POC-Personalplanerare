import { useEffect } from "react";

export function useResizeTimeBlock({
  isResizing,
  isResizingLeft,
  isResizingRight,
  stopResizing,
  duration,
  setDuration,
  hourRepresentationOfOnePixel,
  initialMousePositionRight,
  setInitialMousePositionRight,
  initialMousePositionLeft,
  setInitialMousePositionLeft,
  startTimeInHours,
  setStartTimeInHours

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
      if (isResizingRight) {
        console.log("vi movar Right Handle");

        //varje gång musen flyttar sig en pixel tar vi reda på diffen
        const oldPosition = initialMousePositionRight;
        const newPosition = e.clientX;

        const positionDiff = newPosition - oldPosition;
        const durationDiff = hourRepresentationOfOnePixel * positionDiff;

        console.log(
          "Diff muspek. Position:", positionDiff, "px |", "Diff duration: ", durationDiff, "h"
        );

        //duration är de som styr blockets högra position
        setDuration(duration + durationDiff);

        // uppdaterar initial musposition för nästa förflyttning:
        setInitialMousePositionRight(newPosition);
      }

      if (isResizingLeft) {
        console.log("vi movar Left Handle");

        //varje gång musen flyttar sig en pixel tar vi reda på diffen
        const oldPosition = initialMousePositionLeft;
        const newPosition = e.clientX;

        const positionDiff = newPosition - oldPosition;
        const durationDiff = hourRepresentationOfOnePixel * positionDiff;

        console.log(
          "Diff muspek. Position:", positionDiff, "px |", "Diff duration: ", durationDiff, "h"
        );

        //Ändrar blockets längd.
        setDuration(duration - durationDiff);

        //blockets vänsta position styrs av starttiden.
        setStartTimeInHours(startTimeInHours + durationDiff)

        // uppdaterar initial musposition för nästa förflyttning:
        setInitialMousePositionLeft(newPosition);
      }
    }



    return () => {
      // Rensa upp event listeners när komponenten avmonteras eller när resizing slutar
      document.removeEventListener("mousemove", resizing);
      document.removeEventListener("mouseup", stopResizing);
      document.body.style.userSelect = "auto";
      document.body.style.webkitUserSelect = "auto";
    };
  }, [duration, hourRepresentationOfOnePixel, initialMousePositionRight, isResizing, setDuration, setInitialMousePositionRight, stopResizing, isResizingLeft, isResizingRight, initialMousePositionLeft, setInitialMousePositionLeft]);
}
