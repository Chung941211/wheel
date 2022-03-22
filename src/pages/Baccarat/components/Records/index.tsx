import { useEffect } from "react";
import { useRequest } from 'ice';
import fscService from '@/services/fscApi';
import text from '@/locales';

import styles from './index.module.css';

import back from '@/assets/back.png';

const Lists = (props) => {

  const { items, index } = props;
  return (
    <div  className={`${styles.table} ${styles.tbody}`}>
      <div className={styles.num}>{ index + 1 }</div>
      <div className={styles.animal}>
        {  items.bet_items.map((item, key) => <img key={key} src={item.item_img} /> ) }

      </div>
      <div className={styles.result}>
      {  items.reward_val.map((item, key) => <img key={key} src={item.item_img} /> ) }
      </div>
      <div
        className={`${styles.win} ${ items.moment_profit < 0 ? styles.lose : styles.wins}`}>
        { items.moment_profit }
      </div>
      <div className={styles.times}>{items.open_time}</div>
    </div>
  )
}

const Records = (props) => {
  const { handleReward } = props;
  const { data: recordsList, request } = useRequest(fscService.getRecords);
  useEffect(() => {
    request();
  }, [])


  return (
    <>
      <div className={styles.bg}></div>
      <div className={styles.wrapper}>

        <div className={styles.header}>
          <img className={styles.back} onClick={ () => handleReward() } src={back} />
          <div className={styles.title}>{ text.reward }</div>
        </div>

        <div className={`${styles.table} ${styles.thead}`}>
          <div>{ text.level }</div>
          <div>{ text.selected }</div>
          <div>{ text.result }</div>
          <div>{ text.winOrLose }</div>
          <div>{ text.time }</div>
        </div>

        <div className={styles.list}>
          { recordsList && recordsList.map((item, index) => <Lists key={index} index={index} items={item} />)  }
        </div>


      </div>
    </>
  );

  ;
};

export default Records;
