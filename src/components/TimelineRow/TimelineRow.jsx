
import styles from './TimelineRow.module.css'
import { TimeLineIndicatorLines } from '../TimeLineIndicator/TimeLineIndicator';

function TimelineRow({ firstColumnSize, userData, timelineSize, children }) {
    console.log(userData); // För att kolla på värdet för userData
    console.log(firstColumnSize);


    return (<>


        <div className={styles.row}>
            <TimeLineIndicatorLines firstColumnSize={10} timelineSize={timelineSize} />

            <div className={styles.firstColumn} style={{ width: `${firstColumnSize}rem` }}>
                {userData.name}
            </div>
            {children}
        </div>
    </>
    )
}

export default TimelineRow
