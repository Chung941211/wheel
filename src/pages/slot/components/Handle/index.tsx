import { useEffect, useState } from "react";

import styles from './index.module.css';
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

  useEffect(() => {
    handleBets(bets[0])
  }, [])

  return (
    <div className={styles.handle}>
      <div className={styles.lefts}>
        <div className={styles.btnWrapper}>
        { bets.map((item, index) =>
          <div
            onClick={ () => handleBets(item)}
            key={index}
            className={`${styles.btn} ${ activeBets.id === item.id ? styles['active' + index] : ''} ${styles['btn' + index]}`}>
              <span>{item.num}</span>
            </div>)
        }
        </div>
      </div>
      <div>
        <div className={styles.content}>
          <div className={`${styles.nums} iconfont`}>{ more['left'] || '' }</div>
          <div className={`${styles.nums} iconfont`}>{ more['right'] || '' }</div>
        </div>
        <div className={styles.mainer}>
          <div>
            <div
              onClick={ () => handleSetRecords('left')}
              className={`${styles.direction} ${styles.directionLeft}`} />
          </div>
          <div>
            <div
              onClick={ () => handleSetRecords('right')}
              className={`${styles.direction} ${styles.directionRight}`}  />
          </div>
        </div>
      </div>
      <div>
        <div onClick={ () => handleOpen() } className={styles.go} />
      </div>
    </div>
  )
}

export default Handle;
