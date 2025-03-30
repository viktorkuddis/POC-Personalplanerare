import React from 'react';

import styles from './ShiftCard.module.css'

export default function ShiftCard({ person, shift, variant }) {
    const { startTime, endTime, breakDuration, breakStartTime, breakEndTime, totalHours, effectiveWorkHours, comment } = shift;

    if (variant == "smallRow") {
        return (

            <small>
                <div className={styles.rowCard}>
                    <div className={styles.rowCardContent}>
                        <div className={styles.shiftDetails}>
                            <section>
                                <strong>
                                    {new Date(startTime).toISOString().slice(11, 16)} - {new Date(endTime).toISOString().slice(11, 16)}
                                </strong>
                                <br />
                                {person.name}
                            </section>

                            {breakStartTime && breakEndTime ? (
                                <section>
                                    <strong>Rast:</strong>
                                    <br />
                                    {new Date(breakStartTime).toISOString().slice(11, 16)} - {new Date(breakEndTime).toISOString().slice(11, 16)}
                                </section>
                            ) : (<section>
                                <strong>Rast:</strong>
                                <br />
                                -
                            </section>)}

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
                            {comment && <section>&#9432;   <i>{comment}</i></section>}
                        </section>

                        <section className={styles.buttonsContainer}>
                            knapp
                        </section>



                    </div>

                </div>












            </small >

        );
    }

    if (variant == "smallCard") {
        return (

            <small>
                <div className={styles.card}>
                    <div>
                        <strong>
                            {new Date(startTime).toISOString().slice(11, 16)} - {new Date(endTime).toISOString().slice(11, 16)}
                        </strong> ({totalHours} h)
                    </div>
                    <div>

                        {breakStartTime && breakEndTime && (
                            <> <strong>Rast: </strong>
                                {new Date(breakStartTime).toISOString().slice(11, 16)} - {new Date(breakEndTime).toISOString().slice(11, 16)} ({breakDuration} min)
                                <br />
                                <strong>Total arbetstid:</strong> {effectiveWorkHours} h

                            </>)}
                    </div>

                    <div>
                        <i>{comment}</i>
                    </div>
                </div>
            </small>

        );
    }

}
