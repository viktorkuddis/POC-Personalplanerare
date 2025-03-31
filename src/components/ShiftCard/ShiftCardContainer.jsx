import ShiftCardBody from "./ShiftCardBody";
import ShiftCardBodyEditable from "./ShiftCardBodyEditable";
import { useState } from "react";

import styles from "./ShiftCardContainer.module.css";

function ShiftCardContainer({
  person,
  shift,
  teamList,
  isEditingMode,
  handleChangeShift,
}) {
  const [isEditing, setIsEditing] = useState(isEditingMode || false);

  return (
    <div className={styles.shiftCardContainer}>
      {!isEditing ? (
        <div className={styles.shiftCardListItem}>
          <ShiftCardBody
            person={person}
            shift={shift}
            teamList={teamList}
            variant={"smallRow"}
          />
          <button onClick={() => setIsEditing(true)}>Ändra</button>
        </div>
      ) : (
        <div className={styles.shiftCardEditableItem}>
          <ShiftCardBodyEditable
            setIsEditing={setIsEditing}
            handleChangeShift={handleChangeShift}
            person={person}
            shift={shift}
            teamList={teamList}
          />
        </div>
      )}
    </div>
  );
}

export default ShiftCardContainer;
