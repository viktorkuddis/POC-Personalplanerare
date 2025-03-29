// import { useRef, useEffect, useCallback } from "react";
import "./App.css";

//importing dummy data:
import users from './dummyData/users.json'
import scheduleRules from './dummyData/scheduleRules.json'

import TimeBlock from "./components/TimeBlock/TimeBlock";
import { TimeLineIndicatorLines, TimeLineIndicatorNumbers } from "./components/TimeLineIndicator/TimeLineIndicator";
import TimelineRow from "./components/TimelineRow/TimelineRow";

const timelineSize = 2;

console.log("users:", users)
console.log('scheduleRules:', scheduleRules)

console.log(timelineSize)

console.log(users[0])
function App() {
  return (
    <>
      <h2>POC PERSONALPLANERARE</h2>
      <div className="container">

        <div className="scrollContainer">

          <div className="contentContainer">


            <TimeLineIndicatorNumbers firstColumnSize={10} timelineSize={timelineSize} />


            <TimelineRow firstColumnSize={10} timelineSize={timelineSize} userData={users[0]}>
              <TimeBlock timelineSize={timelineSize} />
            </TimelineRow>
            <TimelineRow firstColumnSize={10} timelineSize={timelineSize} userData={users[0]}>
              <TimeBlock timelineSize={timelineSize} />
            </TimelineRow>
            <TimelineRow firstColumnSize={10} timelineSize={timelineSize} userData={users[0]}>
              <TimeBlock timelineSize={timelineSize} />
            </TimelineRow>
            <TimelineRow firstColumnSize={10} timelineSize={timelineSize} userData={users[0]}>
              <TimeBlock timelineSize={timelineSize} />
            </TimelineRow>







            {/* <TimeBlock timelineSize={timelineSize}></TimeBlock>
            <br />
            <TimeBlock timelineSize={timelineSize}></TimeBlock>
            <br /> <TimeBlock timelineSize={timelineSize}></TimeBlock>
            <br /> <TimeBlock timelineSize={timelineSize}></TimeBlock>
            <br /> <TimeBlock timelineSize={timelineSize}></TimeBlock>
            <br /> <TimeBlock timelineSize={timelineSize}></TimeBlock>
            <br /> <TimeBlock timelineSize={timelineSize}></TimeBlock>
            <br /> */}


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
