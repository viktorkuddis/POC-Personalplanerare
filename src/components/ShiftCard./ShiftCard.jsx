import React from 'react';

import styles from './ShiftCard.module.css'

export default function ShiftCard({ person, shift }) {
    const { startTime, endTime, breakDuration, breakStartTime, breakEndTime, totalHours, effectiveWorkHours, comment } = shift;

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
