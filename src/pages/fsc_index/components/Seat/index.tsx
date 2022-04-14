import { useState, useEffect } from "react";
import { useRequest } from 'ice';

import fscService from '@/services/fscApi';

import styles from './index.module.css';
import micImg from '@/assets/mic_ico.png';
import mcImg from '@/assets/main.png';
import record from '@/assets/record_icon.png';
import logo from '@/assets/logo.png';
import golden from '@/assets/golden.png';


const Gold = (props) => {
  const { gold } = props;
  const [ goldItem, setGoldItem ] = useState<number[]>([]);
  const mystyles = {
    '--top': `${gold.top}px`,
    '--left': `${gold.left}px`,
  } as React.CSSProperties;
  useEffect(() => {
    if (goldItem.length === 15) {
      return;
    }
    let timer = setTimeout(() => {
      setGoldItem([ ...goldItem , 1])
    }, 100);
    return () => {
      clearTimeout(timer)
    };
  }, [ goldItem ]);

  return(
    <>
      { goldItem.map((item, index) => <img className={`${gold.win ? styles.golden : styles.lose }`} key={index} src={golden} style={mystyles} />) }
    </>
  )

}
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
  const { rows, info } = props;

  useEffect(() => {
    if (rows.is_ready_game === 1) {
      setReady(1);
    } else {
      setReady(0);
    }
  }, [ rows ])

  const handleSeat = () => {
    if (!rows.user_id) {
      return;
    }
    window.BiubiuClub.callback("user_page", JSON.stringify({'user_id': rows.user_id}));
  }
  return (
    <div id={`seat-${rows.id}`} className={styles.seatRows} key={rows} onClick={ () => handleSeat() }>

      { !rows.user_id && <div className={styles.empty}>Empty</div> }
      { rows.user_id && <div className={styles.has}>
        <div className={styles.portrait}>
          { ready === 1 && info.stage_status === 2 && <div className={styles.readys}>准备</div> }
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
  const [ recordBol, setRecordBol ] = useState(false);
  const [ historyItem, setHistoryItem ] = useState<any[]>([]);
  const [ recordsId, setRecordsId ] = useState<number[]>([]);
  const [ micOpen, setMicOpen ] = useState<boolean>(true);
  const [ gold, setGold ] =  useState<goldType[]>([]);
  const { request: postSound } = useRequest(fscService.postSound);
  const { request: postRemove } = useRequest(fscService.postRemove);
  const { mic, fscData, result, uid } = props;
  const { history, historyItemCount, reward, bet_records, info } = fscData;

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
    if (result) {
      setTimeout(() => {
        handleGold();
      }, 2000)
    } else {
      setGold([]);
    }
  }, [result]);


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

  const handleGold = () => {
    const parent:HTMLElement = document.getElementById(`seat`) as HTMLElement;
    let other:any[] = result.winner.other;
    let tempArr:goldType[] = [];
    let loseArr:goldType[] = [];
    mic.forEach((item, key) => {
      let topNum = key < 6 ? key + 1 : key - 6;
      if (recordsId.indexOf(item.user_id) < 0) {
        return
      }
      let win:boolean = false;
      other.forEach(element => {
        if (element.user_id === item.user_id) {
          win = true
        }
      });
      if (win) {
        tempArr.push({
          win,
          left: key < 6 ? 20 : parent.clientWidth - 40,
          top: topNum * 70 + 30
        });
      } else {
        loseArr.push({
          win,
          left: key < 6 ? 20 : parent.clientWidth - 40,
          top: topNum * 70 + 30
        });
      }
    });
    if (loseArr.length > 0 && tempArr.length > 0) {
      setGold([ ...tempArr ]);
      setTimeout(() => {
        setGold([ ...loseArr ]);
      }, 2000)
    } else if (loseArr.length > 0) {
      setGold([ ...loseArr ]);
    } else {
      setGold([ ...tempArr ]);
    }
  }

  const handleMic = async (open?: Boolean) => {
    // let uid:number | string = '';
    // mic.forEach(element => {
    //   if (element.is_own === 1) {
    //     uid = element.user_id
    //   }
    // });
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

        { gold.length > 0 && gold.map((item, index) => <Gold key={index} gold={item} />) }

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
          { mic.slice(0, 6).map((item, index) => <SeatRows key={index} rows={item} info={info} />) }
        </div>

        <div>
          { mic.slice(6, 13).map((item, index) => <SeatRows key={index} rows={item} info={info} />) }

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
            <img onClick={ () => handleMic() } className={`${ !micOpen ? styles.sound : ''}`} src={micImg} />
          </div>

        </div>
      </div>
    </div>
  )
}

export default Seat;
