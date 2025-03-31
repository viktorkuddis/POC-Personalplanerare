import { useState } from "react";

import styles from "./ShiftCard.module.css";
import { useEffect } from "react";
import { calculateDurationInHours } from "../../utils/calculateDurationUtils";
import { getUpdatedTime } from "../../utils/manipulateTimestringsUtils";

export default function ShiftCard({
  person,
  shift,
  teamList,
  variant,
  handleChangeShift,
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

  const [isEditMode, setIsEditMode] = useState(false);

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

  if (variant == "smallRow") {
    return isEditMode ? (
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
                <strong>&#9432; Info / Kommentar:</strong>
                <input
                  type="text"
                  onChange={(e) => setEditedComment(e.target.value)}
                  value={editedComment}
                  style={{
                    width: "100%",
                    maxWidth: "30rem",
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
            </section>
          </div>
          <section className={styles.buttonsContainer}>
            <button
              onClick={() => {
                setIsEditMode(false);
                handleChangeShift(editedShift);
              }}
            >
              Klar
            </button>
            <button
              onClick={() => {
                setIsEditMode(false);
                handleChangeShift(initialShift);
              }}
            >
              Avbryt
            </button>
          </section>
        </div>
      </div>
    ) : (
      <small>
        <div className={styles.rowCard}>
          <div className={styles.rowCardContent}>
            <div className={styles.shiftDetails}>
              <section>
                <strong>
                  {new Date(startTime).toISOString().slice(11, 16)} -{" "}
                  {new Date(endTime).toISOString().slice(11, 16)}
                </strong>
                <br />
                {person.name}
              </section>

              {breakStartTime && breakEndTime ? (
                <section>
                  <strong>Rast:</strong>
                  <br />
                  {new Date(breakStartTime).toISOString().slice(11, 16)} -{" "}
                  {new Date(breakEndTime).toISOString().slice(11, 16)}
                </section>
              ) : (
                <section>
                  <strong>Rast:</strong>
                  <br />-
                </section>
              )}

              <section>
                <strong>Pass:</strong> <br />
                {totalHours}h
              </section>
              <section>
                <strong>Effektiv tid:</strong> <br />
                {effectiveWorkHours}h
              </section>
            </div>

            <section className={styles.commensContainer}>
              {comment && (
                <section>
                  &#9432; <i>{comment}</i>
                </section>
              )}
            </section>

            <section className={styles.buttonsContainer}>
              <button onClick={() => setIsEditMode(true)}> Ändra</button>
            </section>
          </div>
        </div>
      </small>
    );
  }

  if (variant == "smallCard") {
    return (
      <small>
        <div className={styles.card}>
          <div>
            <strong>
              {new Date(startTime).toISOString().slice(11, 16)} -{" "}
              {new Date(endTime).toISOString().slice(11, 16)}
            </strong>{" "}
            ({totalHours} h)
          </div>
          <div>
            {breakStartTime && breakEndTime && (
              <>
                {" "}
                <strong>Rast: </strong>
                {new Date(breakStartTime).toISOString().slice(11, 16)} -{" "}
                {new Date(breakEndTime).toISOString().slice(11, 16)} (
                {breakDuration} min)
                <br />
                <strong>Total arbetstid:</strong> {effectiveWorkHours} h
              </>
            )}
          </div>

          <div>
            <i>{comment}</i>
          </div>
        </div>
      </small>
    );
  }
}
