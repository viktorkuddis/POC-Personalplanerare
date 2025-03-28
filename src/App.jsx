// import { useRef, useEffect, useCallback } from "react";
import "./App.css";

// import { calculateDurationInHours } from "./utils/calculateDurationUtils";
// import { useState } from "react";
// import { calculateOneHourRepresentationInPixels } from "./utils/calculateTimeRepresentationUtils";

import TimeBlock from "./components/TimeBlock/TimeBlock";
import { TimeLineIndicator } from "./components/TimeLineIndicator/TimeLineIndicator";
const timelineSize = 2;

function App() {
  return (
    <>
      <h2>POC PERSONALPLANERARE</h2>
      <div className="container">
        <div className="scrollContainer">

          <TimeLineIndicator timelineSize={timelineSize} />
          <TimeBlock timelineSize={timelineSize}></TimeBlock>
          <br />
          <TimeBlock timelineSize={timelineSize}></TimeBlock>
          <br /> <TimeBlock timelineSize={timelineSize}></TimeBlock>
          <br /> <TimeBlock timelineSize={timelineSize}></TimeBlock>
          <br /> <TimeBlock timelineSize={timelineSize}></TimeBlock>
          <br /> <TimeBlock timelineSize={timelineSize}></TimeBlock>
          <br /> <TimeBlock timelineSize={timelineSize}></TimeBlock>
          <br />



        </div>
      </div>
      <p> Varje block här representerar 1 h i tid</p>
      <br />
      <br />
    </>
  );
}

export default App;
