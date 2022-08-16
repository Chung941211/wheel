import styles from './index.module.css';

const Seat = (props) => {

  const { section, more, handleReward } = props;
  const { reward } = section;

  return (
    <div>
      <div className={styles.content}>
          {
            reward.map((item, index) => {
              return <div className={styles.rows} key={item.id}>
                <div className={styles.more}>{ more[item.id] || '' }</div>
              </div>
            })
          }
      </div>
      <div className={styles.seat}>
        <div className={styles.list}>
          {
            reward.map((item, index) => {
              return (
                <div className={styles.item} key={item.id} onClick={ () => handleReward(item, index) }>
                  <div>
                    <img className={styles.gift} src={item.show_img}/>
                  </div>
                  <div className={styles.nums}>{ item.multiple }</div>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Seat;
