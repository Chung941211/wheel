import { useState, useEffect } from "react";
import text from '@/locales';

import ball from '../../assets/ball.png';

import styles from './index.module.css';

import diamonds from '@/assets/diamonds.png';


const Down = (props) => {
  const [ chip, setChip] = useState<number>(0);
  const [ active, setActive ] = useState<number>(0);
  const [ turn, setTurn ] = useState<number>();
  const [ speed, setSpeed ] = useState<number>(200);
  const { reward, history, balance, today, handleAdd, info, result, bet } = props;

  const handleChip = (digit: number) => {
    setChip(digit);
  }

  const handleActice = (index, chip) => {
    if (info.showTime > 0) {
      handleAdd(index, chip);
      setTurn(index);
    }
  }

  useEffect(() => {
    let distance = 10000 - info.showTime * -1 * 1000;
    let sp = result ? distance : 1500
    const timer = setInterval(() => {
      setTurn(-1);
    }, sp);
    return () => {
      clearInterval(timer)
    };
  }, [turn]);


  useEffect(() => {
    let timer;
    if (info.showTime < 0 && !result) {
      timer = setInterval(() => {
        setSpeed(speed + 30);
        setActive(active + 1);
      }, speed);
    } else if (info.showTime > 0) {
      setSpeed(200);
    }
    if (result) {
      let num = 0
      reward.forEach((ele, index) => {
        if (result.reward_id === ele.id) {
          num = index;
        }
      });
      if (active % 8 === num) {
        setActive(num);
        setTurn(num);
        return;
      }
    }
    if (!timer) {
      timer = setInterval(() => {
        setActive(active + 1);
      }, speed);
    }
    return () => {
      clearInterval(timer)
    };
  }, [result, info, active]);

  return (
    <div className={styles.down}>

      <div className={styles.circle}>

      <div className={styles.please}>
        { info.showTime > 0 && <div className={styles.select}>{ text.please }</div> }
        { (info.showTime <= 0 && !result) && <div className={styles.select}>{ text.settlement }</div> }
        { (info.showTime <= 0 && result) && <div className={styles.select}>{ text.next }</div> }
        { ((info.showTime <= 0 && result) || info.showTime > 0) && <div className={styles.times}>{info.showTime < 0 ? 10 - info.showTime * -1 : info.showTime}<span>S</span></div> }
      </div>

      <img className={styles.ball} src={ball} alt="" />

      <div className={styles.wrapper}>
        <div className={styles.content}>
          { reward && reward.map((item, index) => {
            return (
              <div
                key={item.id}
                className={`${styles.row} ${active % 8 === index && info.showTime > 0 ? styles.ballActive : ''} ${ item.num > 0 ? styles.ballNum : ''} ${history.length > 0 && (item.id == history[0].reward_id) ? item.num > 0 ? styles.ballNumLast : styles.ballLast : ''}`}
                onClick={() => handleActice(index, chip)} >
                <div className={`${styles.container} ${info.showTime <= 0 ? styles.off : ''} ${active % 8 === index ? styles.on : '' }`}>
                  <img className={`${styles.ballAnimal} ${turn === index ? styles.ballTurn : '' }`} src={item.img} />
                  <div className={styles.ballContent}>
                    <div className={styles.ballTop}>
                      <div className={styles.you}>YOU:</div>
                      <img src={diamonds} />
                      <div className={styles.num}>{ item.num }</div>
                    </div>
                    <div className={styles.ballWord}>win {item.multiple} times</div>
                    <div className={styles.max}>
                       {  [...Array(item.max_num).keys() ].map(item => <img key={item} src={diamonds} />) }
                    </div>
                  </div>
                </div>
              </div>
              )
            })
          }
        </div>
      </div>

      </div>

      <div className={styles.operation}>
          {
            bet.map((item, index) => {
              return (
                <div key={index} onClick={() => handleChip(index)} className={`${styles.chip} ${chip === index ? styles.active : ''}`}>
                  <div className={`${styles['chip-' + index]}`}>{ item.diamond }</div>
                </div>
              )
            })
          }

        </div>

      <div className={styles.choose}>
        <div className={styles.chooseRows}>
          <div>{ text.balance }</div>
          <div className={styles.diamonds}>
            <img src={diamonds} />
            <span>{ parseInt(balance) }</span>
          </div>
        </div>
        <div className={styles.chooseRows}>
          <div>{ text.profit }</div>
          <div className={styles.diamonds}>
            <img src={diamonds} />
            <span>{ today }</span>
          </div>
        </div>
      </div>

      <div className={styles.result}>
        <div className={styles.title}>{ text.result }</div>
        <div className={styles.animal}>
          { history && history.slice(0, 5).map((item, index) => {
            return (
              <div key={index} className={styles.rows}>
                { index === 0 && <div className={styles.new}>{ text.news }</div>}
                <img src={item.img} />
              </div>
            )
          }) }
        </div>
      </div>
    </div>
  );
};

export default Down;
