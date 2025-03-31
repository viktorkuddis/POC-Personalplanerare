import { useState } from "react";

import styles from "./ShiftCardBodyEditable.module.css";
import { useEffect } from "react";
import { calculateDurationInHours } from "../../utils/calculateDurationUtils";
import { getUpdatedTime } from "../../utils/manipulateTimestringsUtils";

export default function ShiftCardBodyEditable({
  person,
  shift,
  teamList,
  handleChangeShift,
  setIsEditing,
}) {
  const {
    startTime,
    endTime,
    breakDuration,
    breakStartTime,
    breakEndTime,
    totalHours,
    effectiveWorkHours,
    comment,
  } = shift;

  const [editedStartTime, setEditedStartTime] = useState(
    startTime.substring(11, 16)
  );
  const [editedEndTime, setEditedEndTime] = useState(endTime.substring(11, 16));
  const [editedTotalHours, setEditedTotalHours] = useState(totalHours);

  const [editedBreakStartTime, setEditedBreakStart] = useState(
    breakStartTime == "" || !breakStartTime
      ? "00:00"
      : breakStartTime.substring(11, 16)
  );
  const [editedBreakEndTime, setEditedBreakEnd] = useState(
    breakEndTime == "" || !breakEndTime
      ? "00:00"
      : breakEndTime.substring(11, 16)
  );
  const [editedBreakDuration, setEditedBreakDuration] = useState(breakDuration);
  const [editedEffectiveWorkHours, setEeffectiveWorkHours] =
    useState(effectiveWorkHours);

  const [editedUserId, setEditedUserId] = useState(person.id);
  const [editedComment, setEditedComment] = useState(comment);

  const convertToISO = (dateString, timeString) => {
    const date = new Date(dateString);
    const [hours, minutes] = timeString.split(":").map(Number);
    date.setUTCHours(hours, minutes, 0, 0);
    return date.toISOString();
  };

  const initialShift = { ...shift };

  const editedShift = {
    ...shift,
    userId: editedUserId,
    startTime: convertToISO(startTime, editedStartTime),
    endTime: convertToISO(endTime, editedEndTime),
    breakDuration: editedBreakDuration,
    breakStartTime: convertToISO(startTime, editedBreakStartTime),
    breakEndTime: convertToISO(endTime, editedBreakEndTime),
    totalHours: editedTotalHours,
    effectiveWorkHours: editedEffectiveWorkHours,
    comment: editedComment,
    // ja, vi skickar in passets start och sluttid som första argument även för rastens start och sluttid, när vi konverterar till ISO string. Detta för att Vissa pass inte har en angiven start och sluttid för rast och då fungerar det inte att göra konverteringen.
  };

  // uppdaterar uträkning om passets längd ändras
  useEffect(() => {
    setEditedTotalHours(
      calculateDurationInHours(
        getUpdatedTime(startTime, editedStartTime),
        getUpdatedTime(endTime, editedEndTime)
      )
    );
  }, [editedEndTime, editedStartTime, endTime, startTime]);

  // uppdaterar uträkning om rasten ändras
  useEffect(() => {
    /* OBS! Eftersom alla pass inte har breakStar och breakEnd - tid angiven,  så baserar vi istället uträkningen av rastens längd på PASSETS start och slut-tidssträng. 
    Detta bara för att ha datumsträngar att manipulera. 
    Dessa datumsträngar används sedan för att räkna diffen och få fram rastens längd.*/
    setEditedBreakDuration(
      calculateDurationInHours(
        getUpdatedTime(startTime, editedBreakStartTime),
        getUpdatedTime(endTime, editedBreakEndTime)
      )
    );
    setEeffectiveWorkHours(editedTotalHours - editedBreakDuration);
  }, [
    editedBreakDuration,
    editedBreakEndTime,
    editedBreakStartTime,
    editedTotalHours,
    endTime,
    startTime,
  ]);

  // console.log({
  //   editedStartTime,
  //   editedEndTime,
  //   editedTotalHours,
  //   editedBreakStart: editedBreakStartTime,
  //   editedBreakEnd: editedBreakEndTime,
  //   editedBreakDuration,
  //   editeduserId,
  //   editedComment,
  // });

  return (
    <div className={styles.rowCard}>
      <div className={styles.editorialRowCardLayout}>
        <div className={styles.editorialRowCardContent}>
          <section className={styles.editorialRowCardSection}>
            <section>
              <strong>Start - Slut:</strong>
              <br />
              <input
                type="time"
                onChange={(e) => setEditedStartTime(e.target.value)}
                value={editedStartTime}
              />
              -
              <input
                type="time"
                onChange={(e) => setEditedEndTime(e.target.value)}
                value={editedEndTime}
              />
            </section>
            <section>
              <strong>Rast:</strong>
              <br />
              <input
                type="time"
                onChange={(e) => setEditedBreakStart(e.target.value)}
                value={editedBreakStartTime}
              />
              -
              <input
                type="time"
                onChange={(e) => setEditedBreakEnd(e.target.value)}
                value={editedBreakEndTime}
              />
            </section>
            <section>
              <strong>Bemannas av:</strong>
              <br />
              <select
                value={editedUserId}
                onChange={(e) => setEditedUserId(e.target.value)}
              >
                {teamList.map((teamMember) => (
                  <option key={teamMember.id} value={teamMember.id}>
                    {teamMember.name}
                  </option>
                ))}
              </select>
            </section>
            <section style={{ flexGrow: "1" }}>
              <strong>&#9432; Info / Kommentar: </strong>
              <br />
              <input
                type="text"
                onChange={(e) => setEditedComment(e.target.value)}
                value={editedComment}
                style={{
                  width: "100%",
                  maxWidth: "35rem",
                  minWidth: "15rem",
                }}
              />
            </section>
          </section>

          <section className={styles.editorialRowCardSection}>
            <section>
              <strong>Pass:</strong> <br />
              {editedTotalHours}h
            </section>
            <section>
              <strong>Effektiv tid:</strong> <br />
              {editedEffectiveWorkHours}h
            </section>
            {editedBreakDuration > 0 && (
              <section>
                Rast: <br />
                {editedBreakDuration}h
              </section>
            )}

            <section className={styles.buttonsContainer}>
              <button
                onClick={() => {
                  handleChangeShift(editedShift);
                  setIsEditing(false);
                }}
              >
                Klar
              </button>
              <button
                onClick={() => {
                  handleChangeShift(initialShift);
                  setIsEditing(false);
                }}
              >
                Avbryt
              </button>
            </section>
          </section>
        </div>
      </div>
    </div>
  );
}
