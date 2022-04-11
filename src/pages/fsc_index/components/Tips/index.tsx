import { useEffect, useState } from "react";

import text from '@/locales';
import close from '@/assets/close_fill.png';
import styles from './index.module.css';

const Rules = (props) => {

  const [ myReward, setMyReward ] = useState<any[]>([]);
  const [ my, setMy ] = useState<any>({});
  const { handleShow, fscData } = props;

  useEffect(() => {
    let my: any = {};
    let temp: any[] = [];
    fscData.user_mic_serial.forEach(element => {
      if (element.is_own === 1) {
        my = element;
        setMy({ ...element })
      }
    });
    fscData.bet_records.forEach(element => {
      if (element.bet_user_id == my.user_id) {
        temp.push(element);
      }
    });

    setMyReward(temp)

  }, [])
  const getBet = (betId: string) => {
    let diamond: number = 0;
    fscData.bet.forEach(element => {
      if (element.id == betId) {
        diamond = element.diamond
      }
    });
    return diamond;
  }

  const getReward = (reward: string) => {
    let diamond:string[] = reward.split('_');
    let showImg:string[] = [];
    fscData.reward.forEach(element => {
      diamond.forEach(item => {
        if (element.id == item) {
          showImg.push(element.show_img)
        }
      })
    });
    return showImg;
  }

  return (
    <div className={styles.props}>
      <div className={styles.content}>
        <img className={styles.close} src={close}  onClick={handleShow}  />
        { my.user_info && <div className={styles.title}>{ my.user_info.nickname }</div> }
        <div className={styles.list}>
          { myReward.map((item, index) => {
            return (
                <div key={index} className={styles.rows}>
                  <div className={styles.left}>{ item.type }</div>
                  <div className={styles.mian}>
                    { getReward(item.reward_id_str).map((item, index) => <img key={index} src={item} />) }
                    </div>
                  <div className={styles.right}>{ getBet(item.bet_id) }</div>
                </div>
              )
            })
          }
        </div>
      </div>
      <div onClick={handleShow} className={styles.bg} />
    </div>
  )
}

export default Rules;
