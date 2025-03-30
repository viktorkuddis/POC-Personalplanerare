// import { useRef, useEffect, useCallback } from "react";
import "./App.css";

import { useState, useEffect, useRef } from "react";


//importing dummy data:
import teamMembers from './dummyData/users.json'
import scheduleRules from './dummyData/scheduleRules.json'
import shifts from './dummyData/shifts.json'

import TimeBlock from "./components/TimeBlock/TimeBlock";
import { TimeLineIndicatorLines, TimeLineIndicatorNumbers } from "./components/TimeLineIndicator/TimeLineIndicator";
import TimelineRow from "./components/TimelineRow/TimelineRow";
import TeamList from "./components/TeamList/TeamList";


console.log("teamMembers:", teamMembers)
console.log('scheduleRules:', scheduleRules)


function App() {
  const scrollContainerRef = useRef(null);
  const [timelineSize, setTimelineSize] = useState(2)

  function handleChangeTimelineSize(operator) {
    if (operator == "+") setTimelineSize((prev) => prev + 1)
    if (operator == "-") setTimelineSize((prev) => prev - 1)


  }

  //navigerat till mitten av containern vid start
  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      container.scrollLeft = (container.scrollWidth - container.clientWidth) / 2;
    }
  }, []);


  return (
    <>
      <h2>POC PERSONALPLANERARE</h2>

      <div className="teamListContainer">
        <TeamList teamlist={teamMembers} shifts={shifts} />

      </div>
      <div className="container">

        <button onClick={() => handleChangeTimelineSize("-")}>-</button>
        <button onClick={() => handleChangeTimelineSize("+")}>+</button>


        <div ref={scrollContainerRef} className="scrollContainer">

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
