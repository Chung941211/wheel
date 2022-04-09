import { useState, useEffect } from "react";
import { useRequest } from 'ice';

import fscService from '@/services/fscApi';
import { getQueryVariable } from '@/utils';
import styles from './index.module.css';

type betType = {
  reward?: number
  index?: number
  left?: number
  top?: number
  diamond?: number
}

const Seat = (props) => {
  const [ my, setMy ] = useState<any>({});
  const [ records, setRecords ] = useState<object[]>([]);
  const [ two, setTwo ] = useState<boolean>(false);
  const [ end, setEnd ] = useState<boolean>(false);
  const [ oldBet, setOldBet ] = useState<betType[]>([]);
  const [ twoActive, setTwoActive ] = useState<number[]>([]);
  const [ hisActive, setHisActive ] = useState<number[]>([]);
  const { request: getStart } = useRequest(fscService.getStart);
  const {  handleBall, handleChip, fscData, chip, num, result, mic, own} = props;
  const { reward, bet, history, bet_records, info } = fscData;

  useEffect(() => {

    let tempBet:betType[] = [];
    reward.forEach((ele, reward) => {
      if (ele.bet_id_list.length > 0) {
        ele.bet_id_list.forEach(item => {
          tempBet.push(getBetIndex(item, reward))
        })
      }
    });

    setRecords([ ...bet_records ])

    setOldBet([ ...tempBet ]);
  }, []);

  useEffect(() => {
    if (fscData) {
      fscData.user_mic_serial.forEach(ele => {
        if (ele.is_own === 1) {
          setMy(ele);
        }
      });
      if (info.stage_status === 3) {
        handleOther();
      }
      if (info.stage_status === 4) {
        setTwoActive([]);
        setTwo(false);
        setEnd(true);
        handleChip('');
      }
      if (info.stage_status === 5) {
        setOldBet([]);
        setHisActive([]);
        setEnd(false);
      }

      if (result && result.reward_id && fscData.info.stage_status === 4) {
        setHisActive([ ...history[0].reward_id.split('_') ]);
      }

    }
  }, [fscData]);

  const handleOther = () => {
    if (bet_records.length > records.length) {
      let num = bet_records.length - records.length;
      for (let i = 0; i < num; i++) {
        let temp = bet_records[i];
        let betIndex, rewardIndex;
        bet.forEach((item, index) => {
          if (item.id == temp.bet_id) {
            betIndex = index
          }
        });
        reward.forEach((item, index) => {
          if (item.id == temp.reward_id) {
            rewardIndex = index
          }
        });
        mic.forEach((item, index) => {
          if (item.user_id == temp.bet_user_id && item.is_own !== 1) {
            handleBall(rewardIndex, [ rewardIndex ], index, betIndex)
          }
        });
      }
      setRecords([ ...bet_records ]);
    }
  }

  const handleStart = () => {
    let roomId:string | boolean = getQueryVariable('roomId');
    let betType:string | boolean = getQueryVariable('betType');
    getStart({ roomId, betType });
  }

  const getBetIndex = (id: number | string, reward: number) => {
    let location:betType = {};

    fscData.bet.forEach((ele, index) => {
      if (ele.id == id) {
        location = {
          reward,
          index,
          left: Math.round(Math.random() * 50),
          top: Math.round(Math.random() * 50),
          diamond: ele.diamond
        }
      }
    })
    return location;
  }

  const handleTwo = () => {
    setTwo(true);
  }

  const handleEnd = () => {
    setTwoActive([]);
    setTwo(false);
  }

  const handleFinish = () => {
    setTwoActive([]);
    setTwo(false);
    setEnd(true);
    handleChip('');
  }

  const handleClick = (index:number) => {
    if (end) {
      return;
    }
    if (!two || twoActive.length === 2) {
      return handleBall(index, twoActive, own, null);
    }
    const tempArr = twoActive;
    const key = twoActive.indexOf(index);
    if (twoActive.length < 2 && key < 0) {
      tempArr.push(index)
    }
    setTwoActive([ ...tempArr ]);
  }

  return (
    <div className={styles.content}>
      <div id='reward' className={styles.reward}>
        { reward.map((item, index) => {
          return (
            <div
              id={`reward-${index}`}
              onClick={ () => handleClick(index) }
              className={`${styles.rewardItem} ${hisActive.indexOf(item.id.toString()) > -1 ? styles.two : ''} ${twoActive.indexOf(index) > -1 ? styles.two : ''}`}
              key={item.id}>
                <img className={styles.rewardImg} src={item.show_img} />
                { oldBet.length > 0 && oldBet.map(
                  (el, key) => el.reward === index &&
                    <div
                      className={`${styles.old}`}
                      style={{ top: el.top, left: el.top }} key={key}>
                      <div className={styles['chip-' + el.index]}>
                        <span>{ el.diamond }</span>
                      </div>
                    </div>
                  )
                }
            </div>
          )
        }) }
      </div>

      <div className={styles.times}>{ fscData.info.countdown }</div>

      {
        my.is_ready_game === 0 && fscData.info.stage_status !== 4  && fscData.info.stage_status !== 3 &&
        <div className={styles.ready}>
          <span onClick={() => handleStart()}>准备</span>
        </div>
      }

      <div className={styles.operation}>
        { two && <div className={styles.tips}>请选择两门下注</div> }
          {
            fscData.info.stage_status === 3 && my.is_ready_game === 1 && !end && bet.map((item, index) => {
              return (
                <div key={index} onClick={() => handleChip(index)} className={`${styles.chip} ${chip === index ? styles.chipActive : ''}`}>
                  <div className={`${styles['chip-' + index]}`}>{ item.diamond }</div>
                </div>
              )
            })
          }
        </div>
        { fscData.info.stage_status === 3 && !end && my.is_ready_game === 1 &&
          <div>
            <div className={styles.bigBtn}>
              <div className={styles.stop} onClick={ () => handleFinish() }>停止下注</div>
              <div className={styles.number}>{num}</div>
            </div>
            <div className={styles.btn}>
              <div className={`${ two ? styles.twoActive : '' }`} onClick={ () => handleTwo() }>二中二</div>
              <div onClick={ () => handleEnd() }>完成下注</div>
            </div>
          </div>
        }

    </div>
  )
}

export default Seat;
