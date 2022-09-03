import text from '@/locales';

import styles from './index.module.css';

import leftIcon from '@/assets/tiger/leftIcon.png';

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
                  { <img className={styles.info} src={item.item_img} /> }
                </div>
                <div className={styles.amount}>{ item.bet_many === 2 ? <span>{ text.two }({ item.amount })</span> : item.amount }</div>
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
  const { handleRecords, recordsList } = props;

  return (
    <>
      <div onClick={ () => handleRecords() } className={styles.bg}></div>
      <div className={styles.wrapper}>

        <div className={styles.header}>
          <img className={styles.back} onClick={ () => handleRecords() } src={leftIcon} />
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
        </div>


      </div>
    </>
  );

  ;
};

export default Records;
