import { useEffect, useState } from "react";

import styles from './index.module.css';
import gift from '@/assets/tiger/gift.png';

const Seat = (props) => {

  const { section } = props;
  const { reward } = section;

  return (
    <div>
      <div className={styles.content}>
          {
            reward.map(item => {
              return <div className={styles.rows} key={item.id}>
                <div className={styles.more}></div>
              </div>
            })
          }
      </div>
      <div className={styles.seat}>
        <div className={styles.list}>
          {
            reward.map(item => {
              return (
                <div className={styles.item} key={item.id}>
                  <div>
                    <img className={styles.gift} src={item.show_img}/>
                  </div>
                  <div className={styles.nums}>{ item.multiple }</div>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Seat;
