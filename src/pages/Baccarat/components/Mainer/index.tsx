import { useState, useEffect } from "react";

import styles from './index.module.css';


const Seat = (props) => {
  const {  handleBall, handleChip, fscData, chip } = props;
  const { reward, bet } = fscData;

  return (
    <div className={styles.content}>
      <div id='reward' className={styles.reward}>
        { reward.map((item, index) => {
          return (
            <div id={`reward-${index + 1}`} onClick={ () => handleBall(`reward-${index + 1}`) }  className={styles.rewardItem} key={item.id}>
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
                <div key={index} onClick={() => handleChip(index)} className={`${styles.chip} ${chip === index ? styles.chipActive : ''}`}>
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
