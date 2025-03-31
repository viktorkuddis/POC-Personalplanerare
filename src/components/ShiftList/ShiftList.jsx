import ShiftCardBody from "../ShiftCard/ShiftCardBody";
import ShiftCardBodyEditable from "../ShiftCard/ShiftCardBodyEditable";

import ShiftCardContainer from "../ShiftCard/ShiftCardContainer";

export default function TeamList({ teamlist, shifts, handleChangeShift }) {
  console.log(teamlist);
  console.log(shifts);

  return teamlist.map((person) => (
    <div key={`${person.id} `}>
      <div key={person.id} style={{ width: "100%" }}>
        <div>
          {shifts.map(
            (shift) =>
              shift.userId == person.id && (
                <div key={shift.id}>
                  <ShiftCardContainer
                    person={person}
                    shift={shift}
                    teamList={teamlist}
                    handleChangeShift={handleChangeShift}
                    variant={"smallRow"}
                  />
                </div>
              )
          )}
        </div>
      </div>
    </div>
  ));
}
