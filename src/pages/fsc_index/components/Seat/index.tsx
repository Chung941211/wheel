import { useState, useEffect } from "react";

import styles from './index.module.css';
import micImg from '@/assets/mic_ico.png';
import record from '@/assets/record_icon.png';

const Ball = (props) => {
  const { item } = props;
  const mystyles = {
    '--top': item.top,
    '--left': item.left,
  } as React.CSSProperties;
  return (
    <div className={`${styles.ball} ${styles['ball-' + item.active]}`} style={mystyles}>
      <span>{ item.diamond }</span>
    </div>
  )
}

const SeatRows = (props) => {

  const { rows } = props;

  return (
    <div id={`seat-${rows.id}`} className={styles.seatRows} key={rows}>
      { !rows.user_id && <div className={styles.empty}>Empty</div> }
      { rows.user_id && <div className={styles.has}>
        <div className={styles.portrait}>
          <img src={ rows.user_info.headimgurl }  />
        </div>
        <div className={styles.names}>{ rows.user_info.nickname }</div>
        <div className={styles.nums}>{ rows.user_info.balance }</div>
        { rows.ball.map((item, index) => <Ball key={index} item={item} /> )}
      </div> }
    </div>
  )
}

const Seat = (props) => {
  const [ recordBol, setRecordBol ] = useState(false);
  const [ historyItem, setHistoryItem ] = useState<any[]>([]);
  const { mic, fscData } = props;
  const { history, historyItemCount, reward } = fscData;

  useEffect(() => {
    if (history.length > 0) {
      let temp = [];
      temp = history.map(item => {
        let arr:string[] = []
        item.reward_id.split('_').forEach(el => {
          reward.forEach(element => {
            if (element.id == el) {
              arr.push(element.show_img)
            }
          });
        });
        return {
          ...item,
          img: arr
        }
      })
      setHistoryItem(temp);
    }
  }, [ history ]);

  return (
    <div className={styles.seatWrapper}>

      <div className={styles.seat}>

        <div>{ mic.slice(0, 7).map((item, index) => <SeatRows key={index} rows={item} />) }</div>

        <div>
          { mic.slice(7, 14).map((item, index) => <SeatRows key={index} rows={item} />) }

          <div className={`${styles.seatIcon} ${styles.record}`}>
            <img src={record} onClick={ () => setRecordBol(!recordBol) } />
            {
              recordBol &&
              <div className={styles.history}>
                <div className={styles.count}>
                  { historyItemCount.map((item, index) => <div key={index}>{item.name}x{item.num}</div>) }
                </div>
                <div className={styles.lists}>
                  { historyItem.map((el, index) => {
                      return (
                        <div key={index} className={styles.rows}>
                          <div className={styles.index}>{ index + 1 }</div>
                          <div className={styles.animal}>
                            { el.item.map((animal, index) => <div key={index}><img src={el.img[index]} /></div>)  }
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            }
          </div>

          <div className={styles.seatIcon}>
            <img src={micImg} />
          </div>

        </div>
      </div>
    </div>
  )
}

export default Seat;
