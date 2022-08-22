import styles from './index.module.css';

const Seat = (props) => {

  const { section, more, handleReward } = props;
  const { reward } = section;

  return (
    <div className={styles.seat}>
      <div className={styles.list}>
        {
          reward.map((item, index) => {
            return (
              <div className={styles.reward} key={item.id} >
                <div className={styles.rows}>
                  <div className={styles.more}>{ more[item.id] || '' }</div>
                </div>
                <div className={styles.multiple}>
                  <div className={styles.more}>{ item.multiple }</div>
                </div>
                <div className={styles.item} onClick={ () => handleReward(item, index) }>
                  <div>
                    <img className={styles.gift} src={item.show_img}/>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Seat;
