import { useState, useEffect } from "react";
import { useRequest } from 'ice';
import userService from '@/services/api';

import styles from './index.module.css';

import back from '@/assets/back-blue.png';

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

const Rank = () => {
  const { data: recordsList, request } = useRequest(userService.getRecords);
  useEffect(() => {
    request();
  }, [])


  return (
    <div className={styles.wrapper}>

      <div className={styles.header}>
        <img className={styles.back} onClick={ () => window.history.go(-1) } src={back} />
        <div className={styles.title}>Reward</div>
      </div>

      <div className={`${styles.table} ${styles.thead}`}>
        <div>Level</div>
        <div>Selected</div>
        <div>Result</div>
        <div>Win or lose</div>
        <div>Time</div>
      </div>

      <div className={styles.list}>
        { recordsList && recordsList.map((item, index) => <Lists key={index} index={index} items={item} />)  }
      </div>


    </div>
  );

  ;
};

export default Rank;
