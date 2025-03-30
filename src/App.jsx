//TODO: EdgeCases
// man får inte zooma ut för mycket.
// Passen måste följa reglerna uppsatta för det
// Passen ska varna om övertid och om saker krockar
// Rita ut rasterna
// I kortet kan man inte få sätta en rast utanför passets gränder
// I kortet: starttid på rast måste vara före sluttid
// I kortet: starttid på Passet måste vara före sluttid
// I kortetn: man kan inte få sätta sluttid på pass innan starttid.
// sätt inputrutan till att de inte finns nå värde i rastrutorna om båda värdena är 00:00. det betyder att de är tillfälligt fyllda bara
// buggfixa så ett delete i tiden i kortet inte får allt att crascha
//enter i kortet ska bekräfta

// I list VYN: Ha olika kort . editorial kort och et vanligt kort som renderas beroende på om statet is editing är på eller av , så att den editorialkortet förvinner helt när man trycker på avbryt så man inte behöver dras me de gamla staten.

// import { useRef, useEffect, useCallback } from "react";
import "./App.css";

import { useState, useEffect, useRef } from "react";

// OBS ATT TIDSLINJEVYN INTE GÖR SKILLNAD PÅ DATUM, UTAN KOMMER ATT RITA UPP DE BLOCK DEN FÅR OBEROENDE PÅ DATUM BARA TID

//importing dummy data:
import teamMembersData from "./dummyData/users.json";
import scheduleRulesData from "./dummyData/scheduleRules.json";
import shiftsData from "./dummyData/shifts.json";

import TimeBlock from "./components/TimeBlock/TimeBlock";
import {
  TimeLineIndicatorLines,
  TimeLineIndicatorNumbers,
} from "./components/TimeLineIndicator/TimeLineIndicator";
import TimelineRow from "./components/TimelineRow/TimelineRow";
import TeamList from "./components/TeamList/TeamList";

console.log("teamMembersData:", teamMembersData);
console.log("teamMembersData:", scheduleRulesData);

function App() {
  const scrollContainerRef = useRef(null);
  const [timelineSize, setTimelineSize] = useState(2);

  // DATA STATES:
  const [teamMembers] = useState(teamMembersData);
  // const [scheduleRules] = useState(scheduleRulesData)
  const [shifts, setShifts] = useState(shiftsData);

  function handleChangeShift(editedShift) {
    setShifts((prevshifts) => {
      return prevshifts.map((prevShift) =>
        prevShift.id == editedShift.id ? editedShift : prevShift
      );
    });
  }

  function handleChangeTimelineSize(operator) {
    if (operator == "+") setTimelineSize((prev) => prev + 1);
    if (operator == "-") setTimelineSize((prev) => prev - 1);
  }

  //navigerat till mitten av containern vid start
  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      container.scrollLeft =
        (container.scrollWidth - container.clientWidth) / 2;
    }
  }, []);

  return (
    <>
      <div
        style={{
          backgroundColor: "#fff987",
          color: "#4f4b00",
          padding: "0.5rem",
        }}
      >
        <h3>POC PERSONALPLANERARE</h3>
        <small>
          {" "}
          <p>
            Detta är ett koncepttest(Proof of concept) av en större
            schemaläggningsapp. Jag utforskar hur arbetspass kan visualiseras på
            en tidslinje och hur användaren kan interaggera med dem. Systemet
            ska även ge feedback i realtid.
          </p>
        </small>
      </div>

      <div className="teamListContainer">
        <TeamList
          teamlist={teamMembers}
          shifts={shifts}
          handleChangeShift={handleChangeShift}
        />
      </div>

      <div className="container">
        <button onClick={() => handleChangeTimelineSize("-")}>-</button>
        <button onClick={() => handleChangeTimelineSize("+")}>+</button>

        <div ref={scrollContainerRef} className="scrollContainer">
          <div className="contentContainer">
            <TimeLineIndicatorNumbers
              firstColumnSize={10}
              timelineSize={timelineSize}
            />
            {teamMembers.map((person) => (
              <TimelineRow
                key={person.id}
                firstColumnSize={10}
                timelineSize={timelineSize}
                userData={person}
              >
                {shifts.map(
                  (shift) =>
                    shift.userId == person.id && (
                      <TimeBlock
                        key={shift.id}
                        timelineSize={timelineSize}
                        shiftDuration={shift.totalHours}
                        shiftStart={shift.startTime}
                      />
                    )
                )}
              </TimelineRow>
            ))}
          </div>
        </div>
      </div>
      <p> Varje block här representerar 1 h i tid</p>
      <br />
      <br />
    </>
  );
}

export default App;
