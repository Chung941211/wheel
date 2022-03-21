import { useState, useEffect } from "react";

import styles from './index.module.css';
import mic from '@/assets/mic_ico.png';
import record from '@/assets/record_icon.png';

const SeatRows = (props) => {

  const { rows } = props;

  return (
    <div className={styles.seatRows} key={rows}>
      <div className={styles.empty}>Empty</div>
    </div>
  )
}

const Seat = (props) => {
  const [ leftSeat, setleftSeat ] = useState<number[]>([]);
  const [ rightSeat, setrightSeat ] = useState<number[]>([]);

  useEffect(() => {
    let leftArr:Array<number> = [];
    let rightArr:Array<number> = [];

    for (let i = 1; i < 8; i++) {
      leftArr.push(i);
      if (i < 7) {
        rightArr.push(i)
      }
    }

    setleftSeat(leftArr);
    setrightSeat(rightArr);
  }, [])

  return (
    <div>
      <div className={styles.seat}>
        <div>{ leftSeat.map(item => <SeatRows key={item} rows={item} />) }</div>
        <div>
          { rightSeat.map(item => <SeatRows key={item} rows={item} />) }
          <div className={styles.seatIcon}>
            <img src={record} />
          </div>
          <div className={styles.seatIcon}>
            <img src={mic} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Seat;
