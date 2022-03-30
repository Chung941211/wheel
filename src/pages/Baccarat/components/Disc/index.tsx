import { useState, useEffect } from "react";

import styles from './index.module.css';
import mic from '@/assets/disc.png';
import wan from '@/assets/wan.png';
import baccarat from '@/assets/baccarat-01.png';

const Seat = (props) => {
  const { fscData } = props;

  return (
    <>
      <div className={`${styles.disc} ${fscData.info.stage_status === 2 ? styles.shake : ''}`}>
        <div className={`${styles.mic} ${ fscData.info.stage_status === 5 ? styles.move : ''}`}>
          <img src={mic} />
        </div>
        <div className={styles.wan}>
          <img className={styles.wanImg} src={wan} />
          <img className={`${styles.baccarat} ${styles.baccarat01}`} src={baccarat} />
          <img className={`${styles.baccarat} ${styles.baccarat02}`}  src={baccarat} />
          <img className={`${styles.baccarat} ${styles.baccarat03}`}  src={baccarat} />
        </div>
      </div>
    </>
  )
}

export default Seat;
