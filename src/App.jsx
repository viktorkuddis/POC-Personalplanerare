// import { useRef, useEffect, useCallback } from "react";
import "./App.css";

// import { calculateDurationInHours } from "./utils/calculateDurationUtils";
// import { useState } from "react";
// import { calculateOneHourRepresentationInPixels } from "./utils/calculateTimeRepresentationUtils";

import TimeBlock from "./TimeBlock";
import { TimeLineIndicator } from "./components/TimeLineIndicator/TimeLineIndicator";
const timelineSize = 4;

<p> Varje block här representerar 1 h i tid</p>;

function App() {
  return (
    <>
      <div className="container">
        <div className="scrollContainer">
          <div className="timeSpansContainer">
            <TimeLineIndicator timelineSize={timelineSize} />
            <TimeBlock timelineSize={timelineSize}></TimeBlock>
            <TimeBlock timelineSize={timelineSize}></TimeBlock>
            <TimeBlock timelineSize={timelineSize}></TimeBlock>
            <TimeBlock timelineSize={timelineSize}></TimeBlock>
            <TimeBlock timelineSize={timelineSize}></TimeBlock>
            <TimeBlock timelineSize={timelineSize}></TimeBlock>
            <TimeBlock timelineSize={timelineSize}></TimeBlock>
            <TimeBlock timelineSize={timelineSize}></TimeBlock>
            <TimeBlock timelineSize={timelineSize}></TimeBlock>
            <TimeBlock timelineSize={timelineSize}></TimeBlock>
            <TimeBlock timelineSize={timelineSize}></TimeBlock>
            <TimeBlock timelineSize={timelineSize}></TimeBlock>
            <TimeBlock timelineSize={timelineSize}></TimeBlock>
            <TimeBlock timelineSize={timelineSize}></TimeBlock>
            <TimeBlock timelineSize={timelineSize}></TimeBlock>
            <TimeBlock timelineSize={timelineSize}></TimeBlock>
          </div>
          <div className="Time"></div>
        </div>
      </div>
      <TimeBlock timelineSize={timelineSize}></TimeBlock>
      <p> Varje block här representerar 1 h i tid</p>
      <br />
      <br />
    </>
  );
}

export default App;
