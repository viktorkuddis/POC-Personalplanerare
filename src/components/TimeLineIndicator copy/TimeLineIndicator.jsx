import React from "react";

import styles from "./TimeLineIndicator.module.css";

export const TimeLineIndicator = ({ timelineSize }) => {
  return (
    <div className={styles.timeSpansContainer}>
      {Array.from({ length: 24 }, (_, i) => (
        <div
          className={styles.oneHourSpan}
          style={{ width: `${timelineSize}rem` }}
          key={i}
        >
          {i}
        </div>
      ))}
    </div>
  );
};
