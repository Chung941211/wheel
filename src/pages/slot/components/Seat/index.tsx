import { useState, useEffect } from "react";
import styles from './index.module.css';

const Seat = (props) => {

  const { section, more, handleReward } = props;
  const { reward } = section;
  const [ nums, setNums ] = useState<number[]>([]);

  const handleSetReward = (item) => {
    let temp = [...nums]
    temp.push(item)
    setNums(temp)
  }

  useEffect(() => {
    if (nums.length > 0) {
      handleReward(nums[nums.length - 1])
    }
  }, [ nums ])

  return (
    <div className={styles.seat}>
      <div className={styles.list}>
        {
          reward.map((item, index) => {
            return (
              <div className={styles.reward} key={item.id} >
                <div className={styles.rows}>
                  <div className={`${styles.more} iconfont`}>{ more[item.id] || '' }</div>
                </div>
                <div className={`${styles.multiple}`}>
                  <div className={`${styles.more} iconfont`}>{ item.multiple }</div>
                </div>
                <div className={styles.item} onClick={ () => setNums([ ...nums, item.id ]) }>
                  <div className={styles.gift}>
                    <img src={item.show_img}/>
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
