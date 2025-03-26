import { useRef, useEffect, useCallback } from "react";
import "./App.css";

import { calculateDurationInHours } from "./utils/calculateDurationUtils";
import { useState } from "react";
import { calculateOneHourRepresentationInPixels } from "./utils/calculateTimeRepresentationUtils";

// Räknar ut hur många enheter brett tidsblocket ska vara baserat på timmar i deciamlform.
const initialDuration = calculateDurationInHours(
  new Date("2024-03-24T09:00:00"),
  new Date("2024-03-24T17:00:00")
);

console.log("initial duration: ", initialDuration);

// const timelineSize = 3;

export default function TimeBlock({ timelineSize }) {
  console.log("fick in timeline sisa", timelineSize);
  //-----------------------------------------------------
  // VARIABLAR   // VARIABLAR  // VARIABLAR  // VARIABLAR
  const tidsblockRef = useRef();

  const [isResizing, setIsResizing] = useState(false);

  const [duration, setDuration] = useState(initialDuration);

  const [initialMousePositionRight, setInitialMousePositionRight] =
    useState(null);

  // Beskriver hur mycket en timme motsvarar i pixlar på skärmen:
  const [pixelRepresentationOfOneHour, setPixelRepresentationOfOneHour] =
    useState(16);

  //beskriver med deciamler hur mycket EN pixel på skärmen är värd i tid:
  const [hourRepresentationOfOnePixel, setHourRepresentationOfOnePixel] =
    useState(1 / 16);

  //-----------------------------------------------------
  // FUNKTIONER  // FUNKTIONER  // FUNKTIONER  // FUNKTIONER

  function startResizing(e) {
    setIsResizing(true);
    setInitialMousePositionRight(e.clientX);
    // console.log(e.clientX);
    // console.log("resizing startar");
  }

  function stopResizing() {
    setIsResizing(false);
    // console.log("resizing stopad");
  }

  useEffect(() => {
    //sätter hur många pixlar 1h ska motsvara baserat på remstorlek:
    setPixelRepresentationOfOneHour(
      calculateOneHourRepresentationInPixels(timelineSize)
    );
    //...Räknar ut hur mycket en pixel är värd i tid.
    setHourRepresentationOfOnePixel(
      1 / calculateOneHourRepresentationInPixels(timelineSize)
    );
  }, [timelineSize]);

  const resizing = useCallback(
    (e) => {
      if (isResizing) {
        console.log("vi movar");
        //varje gång musen flyttar sig en pixel tar vi reda på diffen
        const oldPosition = initialMousePositionRight;
        const newPosition = e.clientX;

        const sizeDiff = newPosition - oldPosition;

        const durationDiff = hourRepresentationOfOnePixel * sizeDiff;

        console.log(sizeDiff);
        console.log(durationDiff);

        setInitialMousePositionRight(newPosition);
        setDuration(duration + durationDiff);

        // setDuration(duration + 0.1);
        console.log(e.clientX);
      }
    },
    [
      isResizing,
      duration,
      hourRepresentationOfOnePixel,
      initialMousePositionRight,
    ]
  );

  // kollar Resizing pågor och gör logik isåfall.
  // Triggas när isResizing slårs på eller av
  useEffect(() => {
    if (isResizing) {
      //disablear möjligheten att råka markera text:
      document.body.style.userSelect = "none";
      document.body.style.webkitUserSelect = "none";

      // Lägg till eventlyssnare på musen
      document.addEventListener("mousemove", resizing);
      document.addEventListener("mouseup", stopResizing);
    } else {
      //Man får nu markera text igen när resizing är avstängd
      document.body.style.userSelect = "auto";
      document.body.style.webkitUserSelect = "auto";
    }

    return () => {
      // Rensa upp event listeners när komponenten avmonteras eller när resizing slutar
      document.removeEventListener("mousemove", resizing);
      document.removeEventListener("mouseup", stopResizing);
      document.body.style.userSelect = "auto";
      document.body.style.webkitUserSelect = "auto";
    };
  }, [isResizing, resizing]);

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
        ref={tidsblockRef}
        style={{ width: `${duration * pixelRepresentationOfOneHour}px` }}
        className="resizeable"
      >
        <div
          className="handle"
          onMouseDown={startResizing}
          onMouseUp={stopResizing}
        ></div>
      </div>
      {duration}h
    </>
  );
}
