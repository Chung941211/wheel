import { useState, useEffect } from "react";

import styles from './index.module.css';
import mic from '@/assets/disc.png';
import wan from '@/assets/wan.png';
import baccarat from '@/assets/baccarat-01.png';

const Seat = (props) => {


  return (
    <>
      <div className={styles.disc}>
        <div className={styles.mic}>
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
