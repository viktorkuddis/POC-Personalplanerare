import { useRef, useEffect, useCallback } from "react";
import "./App.css";

import { calculateDurationInHours } from "./utils/calculateDurationUtils";
import { useState } from "react";
import { calculateOneHourRepresentationInPixels } from "./utils/calculateTimeRepresentationUtils";

// Räknar ut hur många enheter brett tidsblocket ska vara baserat på timmar i deciamlform.
const initialDuration = calculateDurationInHours(
  new Date("2024-03-24T00:00:00"),
  new Date("2024-03-24T23:59:00")
);

console.log("initial duration: ", initialDuration);

const timelineSize = 0;

function App() {
  const tidsblockRef = useRef();

  const [isResizing, setIsResizing] = useState(false);

  const [duration, setDuration] = useState(initialDuration);

  // Beskriver hur mycket en timme mitsvarar i pixlar på skärmen:
  const [pixelRepresentationOfOneHour, setPixelRepresentationOfOneHour] =
    useState(16);

  //beskriver med deciamler hur mycket EN pixel på skärmen är värd i tid:
  const [hourRepresentationOfOnePixel, setHourRepresentationOfOnePixel] =
    useState(1 / 16);

  const [initialMousePositionRight, setInitialMousePositionRight] =
    useState(null);

  useEffect(() => {
    //sätter hur många pixlar 1h ska motsvara baserat på remstorlek:
    setPixelRepresentationOfOneHour(
      calculateOneHourRepresentationInPixels(timelineSize)
    );
    //...Räknar ut hur mycket en pixel är värd i tid.
    setHourRepresentationOfOnePixel(
      1 / calculateOneHourRepresentationInPixels(timelineSize)
    );
  }, []);

  useEffect(() => {
    // console.log("Efter render", tidsblockRef);
    // console.log("Efter render med sat current:", tidsblockRef.current);
  }, []);

  function startResizing(e) {
    setIsResizing(true);
    setInitialMousePositionRight(e.clientX);
    console.log(e.clientX);
    console.log("resizing startar");
  }

  function stopResizing() {
    setIsResizing(false);
    console.log("resizing stopad");
  }

  const NEWRESISINGRIGHT = useCallback(
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
      // Lägg till eventlyssnare på musen
      document.addEventListener("mousemove", NEWRESISINGRIGHT);
      document.addEventListener("mouseup", stopResizing);
    } else {
      //Man får nu markera text igen när resizing är avstängd
      document.body.style.userSelect = "auto";
    }

    return () => {
      // Rensa upp event listeners när komponenten avmonteras eller när resizing slutar
      document.removeEventListener("mousemove", NEWRESISINGRIGHT);
      document.removeEventListener("mouseup", stopResizing);
      document.body.style.userSelect = "auto";
    };
  }, [isResizing, NEWRESISINGRIGHT]);

  // när musen åker över handtaget och isResizing är aktivt så förändras tidsblockets storlek.
  // function resizingRight(e) {
  //   if (isResizing) {
  //     console.log("vi movar");
  //     //varje gång musen flyttar sig en pixel tar vi reda på diffen
  //     const oldPosition = initialMousePositionRight;
  //     const newPosition = e.clientX;

  //     const sizeDiff = newPosition - oldPosition;

  //     const durationDiff = hourRepresentationOfOnePixel * sizeDiff;

  //     console.log(sizeDiff);
  //     console.log(durationDiff);

  //     setInitialMousePositionRight(newPosition);

  //     setDuration(duration + durationDiff);

  //     // setDuration(duration + 0.1);
  //     console.log(e.clientX);
  //   }
  // }

  return (
    <>
      <p> Varje block här representerar 1 h i tid</p>
      <div className="enhmark">1</div>
      <div className="enhmark">2</div>
      <div className="enhmark">3</div>
      <div className="enhmark">4</div>
      <div className="enhmark">5</div>
      <div className="enhmark">6</div>
      <div className="enhmark">7</div>
      <div className="enhmark">8</div>
      <div className="enhmark">9</div>
      <div className="enhmark">10</div>
      <div className="enhmark">11</div>
      <div className="enhmark">12</div>
      <div className="enhmark">13</div>
      <div className="enhmark">14</div>
      <div className="enhmark">15</div>
      <div className="enhmark">16</div>
      <div className="enhmark">17</div>
      <div className="enhmark">18</div>
      <div className="enhmark">19</div>
      <div className="enhmark">20</div>
      <div className="enhmark">21</div>
      <div className="enhmark">22</div>
      <div className="enhmark">23</div>
      <br />
      <br />
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
      <br />
      rem aka pixelrepresentation av en timme: {pixelRepresentationOfOneHour} px
      <br />
      en pixel på skärmen motsvarar {hourRepresentationOfOnePixel} h
      <br />
      Initial musposition höger: {initialMousePositionRight}
    </>
  );
}

export default App;
