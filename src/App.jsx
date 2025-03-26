// import { useRef, useEffect, useCallback } from "react";
import "./App.css";

// import { calculateDurationInHours } from "./utils/calculateDurationUtils";
// import { useState } from "react";
// import { calculateOneHourRepresentationInPixels } from "./utils/calculateTimeRepresentationUtils";

import TimeBlock from "./TimeBlock";
const timelineSize = 2;

<p> Varje block här representerar 1 h i tid</p>;

function App() {
  return (
    <>
      <TimeBlock timelineSize={timelineSize}></TimeBlock>
      <p> Varje block här representerar 1 h i tid</p>
      <div>
        {Array.from({ length: 24 }, (_, i) => (
          <div
            className="enhmark"
            style={{ width: `${timelineSize}rem` }}
            key={i}
          >
            {i}
          </div>
        ))}
      </div>
      <br />
      <br />
    </>
  );
}

export default App;
