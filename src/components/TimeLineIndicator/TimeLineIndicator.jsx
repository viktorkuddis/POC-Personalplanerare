import React from "react";

import styles from "./TimeLineIndicator.module.css";

export const TimeLineIndicatorNumbers = ({ firstColumnSize, timelineSize }) => {
  return (
    <>
      <div className={`${styles.timeSpansContainer} ${styles.timeSpansContainerNumberVariant}`}
      >
        <div className={styles.paddingBoxLeft} style={{ width: `${firstColumnSize}rem` }}></div>

        {
          Array.from({ length: 24 }, (_, i) => (
            <div
              className={`${styles.oneHourSpan} ${styles.numberVariant}`}
              style={{ width: `${timelineSize}rem` }}
              key={i}
            >
              <span className={styles.timeStampLable} >
                {i < 10 && "0"}
                {i}:00
              </span>

            </div>
          ))
        }

      </div >

    </>
  );
};

export const TimeLineIndicatorLines = ({ firstColumnSize, timelineSize }) => {
  return (

    <div className={`${styles.timeSpansContainer} ${styles.timeSpansContainerLineVariant}`}>
      <div className={styles.paddingBoxLeft} style={{ width: `${firstColumnSize}rem` }}></div>

      {
        Array.from({ length: 24 }, (_, i) => (
          <div
            className={`${styles.oneHourSpan} ${styles.lineVariant}`}
            style={{ width: `${timelineSize}rem` }}
            key={i}
          >
          </div>
        ))
      }
    </div >
  );
};