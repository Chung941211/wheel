import { useEffect, useState } from "react";
import { useInterval } from 'ahooks';
import { useRequest } from 'ice';

import fscService from '@/services/fscApi';
import { getQueryVariable } from '@/utils';

import Seat from './components/Seat';
import Disc from './components/Disc';
import Mainer from './components/Mainer';
import Rules from './components/Rules';
import Reward from './components/Reward';
import Rank from './components/Rank';
import Records from './components/Records';

import styles from './index.module.css';
import text from '@/locales';

// "26_30_30"

type betItemType = {
  rewardId: string
  betId: number
  betMany: number
}

const Baccarat = () => {
  const [ showRules, setRules ] = useState<boolean>(false);
  const [ showReward, setReward ] = useState<boolean>(false);
  const [ showRecords, setRecords ] = useState<boolean>(false);
  const [ showRank, setRank ] = useState<boolean>(false);
  const [ chip, setChip ] = useState<number | string>('');
  const { request: postClick } = useRequest(fscService.postClick);
  const { data: result, request: getResult } = useRequest(fscService.getResult);
  const { data: fscData, request: getFsc } = useRequest(fscService.getFsc, {
    pollingInterval: 1000,
    pollingWhenHidden: false
  });
  const [ mic, setMic ] = useState<object[]>([]);
  const [ own, setOwn ] = useState<number | string>('');
  const [ betItem, setBetItem ] = useState<betItemType[]>([]);
  let roomId:string | boolean = getQueryVariable('roomId');
  let betType:string | boolean = getQueryVariable('betType');

  useEffect(() => {

    const fetchData = async () => {
      let data = await getFsc({ roomId, betType });
      let seatArr:Array<object> = [];
      for (let i = 0; i < 13; i++) {
        seatArr.push({
          ball: [],
          id: i
        });
      }
      data.user_mic_serial.forEach(ele => {
        if (ele.is_own === 1) {
          setOwn(ele.position);
        }
        seatArr[ele.position] = {
          ...ele,
          ...seatArr[ele.position],
        }
      });
      setMic(seatArr);
    };

    fetchData();

  }, []);

  useEffect(() => {
    if (betItem.length > 0) {
      postClick({ roomId, betType, betItem })
    }
  }, [ betItem ]);

  useInterval(() => {
    if (fscData.info.stage_status === 4 && (!result || (result && result.reward_id === ''))) {
      getResult({ roomId, betType })
    }
  }, 2000);

  const handleChip = (index: number) => {
    if (chip === index) {
      setChip('');
    } else {
      setChip(index);
    }
  }


  const handleBall = (key: number, seat: number | string) => {
    if (chip === '' || fscData.info.stage_status !== 3) {
      return;
    }
    if (!seat && own !== '') {
      seat = own;
    }
    const current:HTMLElement = document.getElementById(`reward-${key}`) as HTMLElement;
    const set:HTMLElement = document.getElementById(`seat-${seat}`) as HTMLElement;
    let eleLeft: number = 0;
    const leftPos = (Math.random() < 0.5 ? -1 : 1) * Math.round(Math.random() * 20);
    const topPos = (Math.random() < 0.5 ? -1 : 1) * Math.round(Math.random() * 20);
    if (seat < 7) {
      eleLeft = current.offsetLeft + 12 + leftPos + set.offsetLeft;
    } else {
      eleLeft = (leftPos + set.offsetLeft - current.offsetLeft) * -1 + 25;
    }
    const eleTop = current.offsetTop + topPos + 250 - set.offsetTop
    let ballPos = {
      left: `${eleLeft}px`,
      top: `${eleTop}px`,
      active: chip,
      diamond: fscData.bet[chip].diamond
    }
    let temp = mic;
    let deduction = temp[seat].user_info.balance - fscData.bet[chip].diamond;
    if (deduction >= 0) {
      temp[seat].user_info.balance = deduction;
      temp[seat].ball.push(ballPos)
      setMic([ ...temp ]);
    }
    setBetItem([{
      rewardId: fscData.reward[key].id.toString(),
      betId: fscData.bet[chip].id,
      betMany: 1
    }])
  }
  return (

    <div className={styles.main}>
      <div className={styles.nav}>
        <div onClick={ () => setRecords(true) }>{ text.records }</div>
        <div onClick={ () => setRules(true) }>{ text.rules }</div>
        <div onClick={ () => setRank(true) }>{ text.rank }</div>
      </div>

      { fscData && <Disc info={fscData.info} history={fscData.history}  /> }

      { fscData &&
        <Mainer
        fscData={fscData}
        chip={chip}
        handleBall={ (reward, index) => handleBall(reward, index) }
        handleChip={ (index) => handleChip(index) } /> }

      { fscData && mic.length > 0 && <Seat mic={mic} fscData={fscData} /> }

      { fscData && showRules && <Rules rule={fscData.rule} handleShow={ () => setRules(false) } /> }

      { showRecords && <Records handleRecords={ () => setRecords(false)} /> }

      { showReward && <Reward handleReward={ () => setReward(false)  } /> }

      { showRank && !showReward && <Rank handleReward={ () => setReward(true)  } handleRank={ () => setRank(false) } /> }

    </div>
  );
};

export default Baccarat;
