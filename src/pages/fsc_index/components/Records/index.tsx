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
        {  items.bet_items.map((item, key) => {
            return (
              <div key={key}>
                <div>
                  { item.item_info.map((el, num) => <img className={styles.info} key={num} src={el.item_img} />) }
                </div>
                <div className={styles.amount}>{ item.bet_many === 2 ? <span>二中二({ item.amount })</span> : item.amount }</div>
              </div>
            )
          })
        }

      </div>
      <div className={styles.result}>
      {  items.reward_val.map((item, key) => <div key={key}><img key={key} src={item.item_img} /></div> ) }
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
  const { handleRecords } = props;
  const { data: recordsList, request } = useRequest(fscService.getRecords);
  useEffect(() => {
    request();
  }, [])


  return (
    <>
      <div onClick={ () => handleRecords() } className={styles.bg}></div>
      <div className={styles.wrapper}>

        <div className={styles.header}>
          <img className={styles.back} onClick={ () => handleRecords() } src={back} />
          <div className={styles.title}>{ text.records }</div>
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
          { recordsList && recordsList.map((item, index) => <Lists key={index} index={index} items={item} />)  }
        </div>


      </div>
    </>
  );

  ;
};

export default Records;
