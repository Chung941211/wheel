import { useState, useEffect } from "react";

import styles from './index.module.css';
import mic from '@/assets/mic_ico.png';
import record from '@/assets/record_icon.png';
import test from '@/assets/test.jpg';

const Ball = (props) => {
  const { item } = props;
  const mystyles = {
    '--top': item.top,
    '--left': item.left,
  } as React.CSSProperties;
  return (
    <div className={`${styles.ball} ${styles['ball-' + item.active]}`} style={mystyles}>
      <span>{ item.diamond }</span>
    </div>
  )
}

const SeatRows = (props) => {

  const { rows, ball } = props;

  return (
    <div id={`seat-${rows}`} className={styles.seatRows} key={rows}>
      { rows !== 8 && <div className={styles.empty}>Empty</div> }
      { rows === 8 && <div className={styles.has}>
        <div className={styles.portrait}>
          <img src={test}  />
        </div>
        <div className={styles.names}>我的名字</div>
        <div className={styles.nums}>1000</div>
        { ball.map((item, index) => <Ball key={index} item={item} /> )}
      </div> }
    </div>
  )
}

const Seat = (props) => {
  const { ball } = props;
  const [ leftSeat, setleftSeat ] = useState<number[]>([]);
  useEffect(() => {
    let leftArr:Array<number> = [];

    for (let i = 1; i < 14; i++) {
      leftArr.push(i);
    }

    setleftSeat(leftArr);
  }, [ ])

  return (
    <div className={styles.seatWrapper}>
      <div className={styles.seat}>
        <div>{ leftSeat.slice(0, 7).map(item => <SeatRows key={item} rows={item} ball={ball} />) }</div>
        <div>
          { leftSeat.slice(7, 14).map(item => <SeatRows key={item} rows={item} ball={ball} />) }
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
