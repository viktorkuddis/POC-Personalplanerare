import { useEffect } from "react";
import styles from "./TimeBlock.module.css";

import { calculateDurationInHours, calculateStartTimeDurationInHours as calculateStartTimeInHours } from "../../utils/calculateDurationUtils";
import { useState } from "react";
import { calculateOneHourRepresentationInPixels, } from "../../utils/calculateTimeRepresentationUtils";

import { useResizeTimeBlock } from "../../hooks/useResizeTimeBlock";

const DummyData = {
  shiftStart: "2024-03-24T09:00:00",
  shiftEnd: "2024-03-24T16:00:00"
}


// Räknar ut hur många enheter brett tidsblocket ska vara baserat på timmar i deciamlform.
const initialDuration = calculateDurationInHours(
  new Date(DummyData.shiftStart),
  new Date(DummyData.shiftEnd)
);
console.log("initial duration: ", initialDuration);

const initialStartTimeInHours = calculateStartTimeInHours(DummyData.shiftStart)




export default function TimeBlock({ timelineSize }) {

  // Beskriver hur mycket en timme motsvarar i pixlar på skärmen:
  const [pixelRepresentationOfOneHour, setPixelRepresentationOfOneHour] = useState(16);
  //beskriver med deciamler hur mycket EN pixel på skärmen är värd i tid:
  const [hourRepresentationOfOnePixel, setHourRepresentationOfOnePixel] = useState(1 / 16);


  const [duration, setDuration] = useState(initialDuration);
  const [startTimeInHours, setStartTimeInHours] = useState(initialStartTimeInHours)

  const [isResizing, setIsResizing] = useState(false);

  const [initialMousePositionRight, setInitialMousePositionRight] = useState(null);


  function stopResizing() {
    setIsResizing(false);
    // console.log("resizing stopad");
  }

  function startResizingRight(e) {
    setIsResizing(true);
    setInitialMousePositionRight(e.clientX);
    // console.log(e.clientX);
    // console.log("resizing startar");
  }

  useEffect(() => {
    //sätter hur många pixlar 1h ska motsvara baserat på remstorlek:
    setPixelRepresentationOfOneHour(calculateOneHourRepresentationInPixels(timelineSize));
    //...Räknar ut hur mycket en pixel är värd i tid.
    setHourRepresentationOfOnePixel(1 / calculateOneHourRepresentationInPixels(timelineSize));
  }, [timelineSize]);



  // //Hur lång tid motdvarar det i pixlar på skärmen::
  // const initialStartTimePosition = initialDuration * pixelRepresentationOfOneHour;
  // console.log("initial Start Time Position", initialStartTimePosition, "px")

  useResizeTimeBlock({
    isResizing: isResizing,
    stopResizing: stopResizing,
    duration: duration,
    setDuration: setDuration,
    hourRepresentationOfOnePixel: hourRepresentationOfOnePixel,
    initialMousePositionRight: initialMousePositionRight,
    setInitialMousePositionRight: setInitialMousePositionRight,
  });

  return (
    <>
      {/* {duration}h
      <br />
      rem aka pixelrepresentation av en timme: {pixelRepresentationOfOneHour} px
      <br />
      en pixel på skärmen motsvarar {hourRepresentationOfOnePixel} h
      <br />
      Initial musposition höger: {initialMousePositionRight} */}
      <div
        style={{ width: `${duration * pixelRepresentationOfOneHour}px`, left: `${startTimeInHours * pixelRepresentationOfOneHour}px` }}
        className={styles.resizeable}
      >
        <div
          className={styles.handle}
          onMouseDown={startResizingRight}
          onMouseUp={stopResizing}
        ></div>
      </div>
      {duration}h
    </>
  );
}
