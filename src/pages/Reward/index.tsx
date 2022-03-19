import { useEffect } from "react";
import { useRequest } from 'ice';
import userService from '@/services/api';
import text from '@/locales';

import styles from './index.module.css';

import back from '@/assets/back.png';
import champion from '@/assets/champion.png';

const Lists = (props) => {

  const { index, item } = props;

  return (
    <div className={styles.bigPortrait}>
      { item &&
        <div className={`${styles['portrait-' + index]}`}>
          <img className={`${styles.portrait} ${index === 1 ? styles.bimg : ''}`} src={item.user_one.headimgurl} />
          <div className={`${styles.nums} ${styles['nums-' + index]}`}>{index}</div>
          <div className={`${styles.name} ${styles['name-' + index]}`}>{ item.user_one.nickname }</div>
        </div>
      }
    </div>
  )
}

const Rank = () => {
  const { data, request } = useRequest<any>(userService.getFerrisTop3);

  useEffect(() => {
    request();
  }, [])

  return (
    <div className={styles.wrapper}>

      <div className={styles.header}>
        <img className={styles.back} onClick={ () => window.history.go(-1) } src={back} />
        <div className={styles.title}>{ text.reward }</div>
      </div>

      <div className={styles.mainer}>
        <div className={styles.word}>
        { text.rewardTips }
        </div>
        <div className={styles.gift}>
          { data && data.gameTopReward.map((item:any, index:number) => {
              return (
                <div key={item.wares_id} className={styles.rows}>
                  <img src={item.img} />
                  <div className={styles.top}>
                    <span>{ text.top }{ index + 1 }</span>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>

      <div className={styles.btn}>{ text.attention }</div>

      <div className={styles.ranking}>
        { data && <Lists item={data.rows[1]} index={2} /> }
        { data && <Lists item={data.rows[0]} index={1} /> }
        { data && <Lists item={data.rows[2]} index={3} /> }
      </div>
      <div className={styles.champion}>
        <img src={champion} />
      </div>

    </div>
  );

  ;
};

export default Rank;
