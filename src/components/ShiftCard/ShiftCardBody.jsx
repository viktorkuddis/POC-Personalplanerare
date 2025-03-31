import styles from "./ShiftCardBody.module.css";

export default function ShiftCardBody({ person, shift }) {
  const {
    startTime,
    endTime,
    breakStartTime,
    breakEndTime,
    totalHours,
    effectiveWorkHours,
    comment,
  } = shift;

  return (
    <small>
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
        <section className={styles.commensContainer}>
          {comment && (
            <section>
              &#9432; <i>{comment}</i>
            </section>
          )}
        </section>
      </div>
    </small>
  );
}
