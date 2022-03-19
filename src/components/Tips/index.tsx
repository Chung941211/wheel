import { useState, useEffect } from "react";
import text from '@/locales';

import styles from './index.module.css';
import diamonds from '@/assets/diamonds.png';

const Tips = (props) => {
  const [ portrait, setPortrait] = useState<string>('');
  const [ times, setTimes] = useState<number>(3);
  const { winner, reward, id } = props;

  useEffect(() => {
    if (reward) {
      reward.forEach((ele, index) => {
        if (id === ele.id) {
          setPortrait(ele.img)
        }
      });
    }
  }, [winner]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (times > 0) {
        let num = times;
        setTimes(num - 1);
      } else {
        clearInterval(timer);
      }

    }, 1000);
    return () => {
      clearInterval(timer)
    };
  }, [winner, times]);

  return (
    <div onClick={props.handleShow} className={styles.props}>
      <div className={styles.wrap}>
        <div className={styles.times}>{times}s</div>
        <div className={styles.title}>
          <div>{ text.round } :</div>
          <img className={styles.imgs} src={portrait}  />
        </div>
        { (winner.self.win_diamond > 0 || winner.self.bet_diamond > 0)  && <div className={styles.contents}>
            <img src={diamonds} />
            <div>{ text.youWin }: { winner.self.win_diamond }</div>
          </div>
        }
        { winner.self.win_diamond === 0 && winner.self.bet_diamond === 0 && <div className={styles.word}>{ text.didnt }</div> }
        <div className={styles.tips}>{ text.congratulations }</div>
        <div className={styles.result}>
          {
            winner.other && winner.other.map((item, index) => {
              return (
                <div key={index} className={styles.rows}>
                  <div className={styles.portrait}>
                    <img src={item.avatar} />
                  </div>
                  <div className={`${styles.nums} ${styles['nums-' + index]}`}>{ index + 1}</div>
                  <div className={styles.name}>{item.name}</div>
                  <div className={styles.diamonds}>
                    <img src={diamonds} />
                    <div>{ item.diamond }</div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Tips;
