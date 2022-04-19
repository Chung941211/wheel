import { useState, useEffect } from "react";
import { useRequest } from 'ice';

import fscService from '@/services/fscApi';
import text from '@/locales';

import styles from './index.module.css';
import micImg from '@/assets/mic_ico.png';
import micClose from '@/assets/close-mic.png';
import master from '@/assets/mic-icon.png';
import mcImg from '@/assets/main.png';
import record from '@/assets/record_icon.png';
import logo from '@/assets/logo.png';
import more from '@/assets/more-icon.png';

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

  const [ ready, setReady ] = useState<number>(0);
  const [ amout, setAmout ] = useState<any>(null);
  const { rows, fscData, gold } = props;
  const { info, is_master, user_id } = fscData;

  useEffect(() => {
    if (rows.is_ready_game === 1) {
      setReady(1);
    } else {
      setReady(0);
    }
  }, [ rows ]);

  useEffect(() => {
    if (gold.length > 0) {
      gold.forEach(element => {
        if (element.user_id === rows.user_id) {
          setAmout(element)
        }
      });
    } else {
      setAmout(null);
    }
  })

  const handleSeat = () => {
    if (!rows.user_id) {
      return;
    }
    window.BiubiuClub.callback("user_page", JSON.stringify({'user_id': rows.user_id}));
  }
  return (
    <div id={`seat-${rows.id}`} className={styles.seatRows} key={rows} onClick={ () => handleSeat() }>
      { rows.user_id && rows.user_info.is_master === 1 && <img className={styles.master} src={master} /> }
      { !rows.user_id && <div className={styles.empty}>{ text.empty }</div> }
      { amout && amout.win_amount >= 0 &&
        <div className={`${styles.amout} ${ rows.id > 5 ? styles.rightAmout : ''}`}>+{amout.win_amount}</div> }
      { amout && amout.lose_amount > 0 &&
        <div className={`${styles.loseAmout} ${ rows.id > 5 ? styles.rightAmout : ''}`}>-{amout.lose_amount}</div> }
      { rows.user_id && <div className={styles.has}>
        <div className={styles.portrait}>
          { ready === 1 && info.stage_status === 2 && <div className={styles.readys}>{ text.ready }</div> }
          <img src={ rows.user_info.headimgurl }  />
        </div>
        <div className={styles.names}>{ rows.user_info.nickname }</div>
        <div className={styles.nums}>{ rows.user_info.balance }</div>
        { rows.ball.map((item, index) => <Ball key={index} item={item} /> )}
      </div> }
    </div>
  )
}

type goldType = {
  win: boolean
  left: number
  top: number
}

const Seat = (props) => {
  const [ historyItem, setHistoryItem ] = useState<any[]>([]);
  const [ recordsId, setRecordsId ] = useState<number[]>([]);
  const [ micOpen, setMicOpen ] = useState<boolean>(true);
  const [ gold, setGold ] =  useState<goldType[]>([]);
  const { request: postSound } = useRequest(fscService.postSound);
  const { request: postRemove } = useRequest(fscService.postRemove);
  const { mic, fscData, result, uid, recordBol, handleInfo } = props;
  const { history, historyItemCount, reward, bet_records, info, wait_total, is_master, user_id } = fscData;

  useEffect(() => {
    fscData.user_mic_serial.forEach(ele => {
      if (ele.is_own === 1) {
        setMicOpen(!Boolean(ele.shut_sound))
      }
    });
  }, []);

  useEffect(() => {
    if (!fscData) {
      return;
    }
    if (info.stage_status === 3) {
      bet_records.forEach(element => {
        let uid:number = Number(element.bet_user_id);
        if (recordsId.indexOf(uid) < 0) {
          setRecordsId([ ...recordsId, uid ])
        }
      });
    }
    if (info.stage_status === 2) {
      setRecordsId([])
    }
  }, [ bet_records ]);

  useEffect(() => {
    if (result && gold.length === 0) {
      setTimeout(() => {
        setGold(result.winner.other);
      }, 2000)
    } else if (!result) {
      setGold([]);
    }
    console.log(result)
  }, [ result ]);


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

  const handleMore = () => {
    window.BiubiuClub.callback("open_wait_list",JSON.stringify({user_id: user_id, uid: uid}));
  }

  const handleMic = async (open?: Boolean) => {
    if (open || !micOpen) {
      postRemove(uid);
      setMicOpen(true)
    } else {
      postSound(uid);
      setMicOpen(false)
    }
  }


  return (
    <div className={styles.seatWrapper}>

      <div id="seat" className={styles.seat}>

        <div>
          <div id={`seat-mc`} className={styles.seatRows}>
            <div className={styles.has}>
              <div className={styles.portrait}>
                <img src={ mcImg }  />
              </div>
              <div className={styles.names}>Biubiu</div>
              <div className={styles.nums}>9999+</div>
            </div>
            <img className={styles.logo} src={logo} />
          </div>
          { mic.slice(0, 6).map((item, index) => <SeatRows key={index} rows={item} fscData={fscData} gold={gold} />) }
        </div>

        <div>
          { mic.slice(6, 13).map((item, index) => <SeatRows key={index} rows={item} fscData={fscData} gold={gold} />) }

          <div className={`${styles.seatIcon} ${styles.record}`}>
            <img src={record} onClick={ () => handleInfo() } />
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
            { is_master === 1 && <div className={styles.more} onClick={ () => handleMore() }>
                <div>
                  { wait_total > 0 && <span>{ wait_total }</span> }
                  <img src={more} />
                </div>
              </div>
            }
            { micOpen && <img onClick={ () => handleMic() } src={micImg} /> }
            { !micOpen && <div className={styles.close}><img onClick={ () => handleMic() } src={micClose} /> </div> }
          </div>

        </div>
      </div>
    </div>
  )
}

export default Seat;
