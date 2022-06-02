import { useEffect, useState } from "react";

import styles from './index.module.css';
import mic from '@/assets/disc.png';
import wan from '@/assets/wan.png';

const Seat = (props) => {

  const { info, history, result } = props;
  const [ showGive, setShowGive ] = useState<boolean>(false);

  useEffect(() => {
    if (info.stage_status === 4 && result && result.reward_id && !showGive) {
      setTimeout(() => {
        setShowGive(true)
      }, 800)
    }

    if (info.stage_status === 2) {
      setShowGive(false)
    }
  }, [info]);

  return (
    <>
      <div className={`${styles.disc} ${ info.stage_status === 2 ? styles.shake : ''}` }>
        <div className={`${styles.mic} ${ showGive ? styles.move : ''}` }>
          <img src={mic} />
        </div>
        <div className={styles.wan}>
          <img className={styles.wanImg} src={wan} />

          { history.length > 0 && history[0].item.map((item, index) =>
            <img key={index} className={`${styles.baccarat} ${styles['baccarat' + index]}`} src={item.img} /> )  }
        </div>
      </div>
    </>
  )
}

export default Seat;
