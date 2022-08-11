import { useEffect, useState } from "react";

import styles from './index.module.css';
import left from '@/assets/tiger/left.png';
import right from '@/assets/tiger/right.png';
import go from '@/assets/tiger/Go.png';

const Handle = (props) => {

  return (
    <div className={styles.handle}>
      <div className={styles.lefts}>
        <div className={styles.btnWrapper}>
          <div className={`${styles.btn} ${styles.btn1}`}>1</div>
          <div className={`${styles.btn} ${styles.btn20}`}>20</div>
          <div className={`${styles.btn} ${styles.btn10}`}>10</div>
          <div className={`${styles.btn} ${styles.btn50}`}>50</div>
        </div>
      </div>
      <div className={styles.mainer}>
        <div className={styles.content}>
          <div className={styles.nums}></div>
          <div className={styles.nums}></div>
        </div>
        <div>
          <img className={styles.direction} src={left} />
          <img className={styles.direction} src={right} />
        </div>
      </div>
      <div>
        <img className={styles.go} src={go} />
      </div>
    </div>
  )
}

export default Handle;
