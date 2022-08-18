import { useState } from "react";

import styles from './index.module.css';
import left from '@/assets/tiger/left.png';
import right from '@/assets/tiger/right.png';
import go from '@/assets/tiger/Go.png';

interface RewardType {
  bet_name?: string;
  id?: number;
  num?: number
}

const Handle = (props) => {

  const { section, more, handleSetBets, handleSetRecords, handleOpen } = props;
  const { bets } = section;

  const [ activeBets, setActiceBets ] = useState<RewardType>({});

  const handleBets = (item) => {
    if (item.id === activeBets.id) {
      setActiceBets({});
      handleSetBets({});
    } else {
      setActiceBets(item);
      handleSetBets(item);
    }
  }

  return (
    <div className={styles.handle}>
      <div className={styles.lefts}>
        <div className={styles.btnWrapper}>
        { bets.map((item, index) =>
          <div
            onClick={ () => handleBets(item)}
            key={index}
            className={`${styles.btn} ${ activeBets.id === item.id ? styles.active : ''} ${styles['btn' + index]}`}>
              {item.num}
            </div>)
        }
        </div>
      </div>
      <div>
        <div className={styles.content}>
          <div className={styles.nums}>{ more['left'] || '' }</div>
          <div className={styles.nums}>{ more['right'] || '' }</div>
        </div>
        <div className={styles.mainer}>
          <div>
            <img
              onClick={ () => handleSetRecords('left')}
              className={`${styles.direction}`}
              src={left} />
          </div>
          <div>
            <img
              onClick={ () => handleSetRecords('right')}
              className={`${styles.direction}`}
              src={right} />
          </div>
        </div>
      </div>
      <div>
        <img onClick={ () => handleOpen() } className={styles.go} src={go} />
      </div>
    </div>
  )
}

export default Handle;
