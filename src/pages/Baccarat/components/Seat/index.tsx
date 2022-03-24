import { useState, useEffect } from "react";

import styles from './index.module.css';
import micImg from '@/assets/mic_ico.png';
import record from '@/assets/record_icon.png';

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

  const { rows } = props;

  return (
    <div id={`seat-${rows.id}`} className={styles.seatRows} key={rows}>
      { !rows.user_id && <div className={styles.empty}>Empty</div> }
      { rows.user_id && <div className={styles.has}>
        <div className={styles.portrait}>
          <img src={ rows.user_info.headimgurl }  />
        </div>
        <div className={styles.names}>{ rows.user_info.nickname }</div>
        <div className={styles.nums}>{ rows.user_info.balance }</div>
        { rows.ball.map((item, index) => <Ball key={index} item={item} /> )}
      </div> }
    </div>
  )
}

const Seat = (props) => {
  const { mic } = props;

  return (
    <div className={styles.seatWrapper}>
      <div className={styles.seat}>
        <div>{ mic.slice(0, 7).map((item, index) => <SeatRows key={index} rows={item} />) }</div>
        <div>
          { mic.slice(7, 14).map((item, index) => <SeatRows key={index} rows={item} />) }
          <div className={styles.seatIcon}>
            <img src={record} />
          </div>
          <div className={styles.seatIcon}>
            <img src={micImg} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Seat;
