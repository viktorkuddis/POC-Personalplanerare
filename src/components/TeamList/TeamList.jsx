import ShiftCard from "../ShiftCard./ShiftCard"
export default function TeamList({ teamlist, shifts }) {

    console.log(teamlist)
    console.log(shifts)


    return (


        teamlist.map((person) => (<div key={`${person.id} `}>
            <div key={person.id} style={{ width: "100%" }}>


                <div style={{

                }}>
                    {shifts.map((shift) => (
                        shift.userId == person.id &&
                        <ShiftCard key={`Card-${person.id}-${shift.id}`} person={person} shift={shift} variant={"smallRow"} />
                    ))}
                </div>

            </div >
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


        ))

    )
}
