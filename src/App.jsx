// import { useRef, useEffect, useCallback } from "react";
import "./App.css";

//importing dummy data:
import teamMembers from './dummyData/users.json'
import scheduleRules from './dummyData/scheduleRules.json'

import TimeBlock from "./components/TimeBlock/TimeBlock";
import { TimeLineIndicatorLines, TimeLineIndicatorNumbers } from "./components/TimeLineIndicator/TimeLineIndicator";
import TimelineRow from "./components/TimelineRow/TimelineRow";

const timelineSize = 2;

console.log("teamMembers:", teamMembers)
console.log('scheduleRules:', scheduleRules)

console.log(timelineSize)

function App() {
  return (
    <>
      <h2>POC PERSONALPLANERARE</h2>
      <div className="container">

        <div className="scrollContainer">

          <div className="contentContainer">


            <TimeLineIndicatorNumbers firstColumnSize={10} timelineSize={timelineSize} />
            {teamMembers.map((person) =>
              <TimelineRow key={person.id} firstColumnSize={10} timelineSize={timelineSize} userData={person}>
                <TimeBlock timelineSize={timelineSize} />
              </TimelineRow>
            )}




          </div>
        </div>
      </div >
      <p> Varje block här representerar 1 h i tid</p>
      <br />
      <br />
    </>
  );
}

export default App;
