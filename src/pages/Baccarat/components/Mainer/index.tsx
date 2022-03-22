import { useState, useEffect } from "react";

import styles from './index.module.css';

const Seat = (props) => {
  const { reward, bet } = props.fscData;

  const handleChip = (index: number) => {
    console.log(index);
  }

  return (
    <div className={styles.content}>
      <div className={styles.reward}>
        { reward.map(item => {
          return (
            <div className={styles.rewardItem} key={item.id}>
              <img className={styles.rewardImg} src={item.show_img} />
            </div>
          )
        }) }
      </div>

      <div className={styles.times}>15</div>

      <div className={styles.operation}>
          {
            bet.map((item, index) => {
              return (
                <div key={index} onClick={() => handleChip(index)} className={`${styles.chip}`}>
                  <div className={`${styles['chip-' + index]}`}>{ item.diamond }</div>
                </div>
              )
            })
          }
        </div>

        <div className={styles.bigBtn}>
          <div className={styles.stop}>停止下注</div>
          <div className={styles.number}>0</div>
        </div>

        <div className={styles.btn}>
          <div>二中二</div>
          <div>完成下注</div>
        </div>

    </div>
  )
}

export default Seat;
