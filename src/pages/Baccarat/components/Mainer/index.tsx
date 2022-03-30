import { useState, useEffect } from "react";
import { useRequest } from 'ice';

import fscService from '@/services/fscApi';
import { getQueryVariable } from '@/utils';
import styles from './index.module.css';

const Seat = (props) => {
  const [ my, setMy ] = useState<any>({});
  const { request: getStart } = useRequest(fscService.getStart);
  const {  handleBall, handleChip, fscData, chip } = props;
  const { reward, bet } = fscData;

  useEffect(() => {
    if (fscData) {
      fscData.user_mic_serial.forEach(ele => {
        if (ele.is_own === 1) {
          setMy(ele);
        }
      });
    }
  }, [fscData]);

  const handleStart = () => {
    let roomId:string | boolean = getQueryVariable('roomId');
    let betType:string | boolean = getQueryVariable('betType');
    getStart({ roomId, betType });
  }

  return (
    <div className={styles.content}>
      <div id='reward' className={styles.reward}>
        { reward.map((item, index) => {
          return (
            <div id={`reward-${index}`} onClick={ () => handleBall(index) }  className={styles.rewardItem} key={item.id}>
              <img className={styles.rewardImg} src={item.show_img} />
            </div>
          )
        }) }
      </div>

      <div className={styles.times}>{ fscData.info.countdown }</div>

      {
        my.is_ready_game === 0 && <div className={styles.ready}>
          <span onClick={() => handleStart()}>准备</span>
        </div>
      }

      <div className={styles.operation}>
          {
            fscData.info.stage_status === 3 && bet.map((item, index) => {
              return (
                <div key={index} onClick={() => handleChip(index)} className={`${styles.chip} ${chip === index ? styles.chipActive : ''}`}>
                  <div className={`${styles['chip-' + index]}`}>{ item.diamond }</div>
                </div>
              )
            })
          }
        </div>
        { fscData.info.stage_status === 3 &&
          <div>
            <div className={styles.bigBtn}>
              <div className={styles.stop}>停止下注</div>
              <div className={styles.number}>0</div>
            </div>
            <div className={styles.btn}>
              <div>二中二</div>
              <div>完成下注</div>
            </div>
          </div>
        }

    </div>
  )
}

export default Seat;
