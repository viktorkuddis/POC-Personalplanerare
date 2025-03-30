import ShiftCard from "../ShiftCard./ShiftCard";
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
                <ShiftCard
                  key={shift.id}
                  person={person}
                  shift={shift}
                  teamList={teamlist}
                  handleChangeShift={handleChangeShift}
                  variant={"smallRow"}
                />
              )
          )}
        </div>
      </div>
      {/* 
            <div key={person.id} style={{
                width: "100%"
            }}>
                {person.name}
                <div style={{
                    display: "flex",
                    gap: "0.5rem",
                    flexWrap: "wrap"
                }}>

                    {shifts.map((shift) => (
                        shift.userId == person.id &&
                        <ShiftCard key={shift.id} person={person} shift={shift} variant={"smallCard"} />
                    ))}
                </div>
                <br />
                < hr />
            </div> */}
    </div>
  ));
}
