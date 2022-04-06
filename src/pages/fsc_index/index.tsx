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
import close from '@/assets/close.png';
import text from '@/locales';

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
  const { data: result, request: getResult, mutate: resetResult } = useRequest(fscService.getResult);
  const { data: fscData, request: getFsc } = useRequest(fscService.getFsc, {
    pollingInterval: 1000,
    pollingWhenHidden: false
  });
  const [ mic, setMic ] = useState<object[]>([]);
  const [ own, setOwn ] = useState<number | string>('');
  const [ betItem, setBetItem ] = useState<betItemType[]>([]);
  const [ num, setNum ] = useState<number>(0);
  let roomId:string | boolean = getQueryVariable('roomId');
  let betType:string | boolean = getQueryVariable('betType');

  useEffect(() => {

    const fetchData = async () => {
      let data = await getFsc({ roomId, betType });
      handleResult(data);
    };

    fetchData();

  }, []);

  useEffect(() => {
    if (betItem.length > 0) {
      postClick({ roomId, betType, betItem })
    }
  }, [ betItem ]);

  useInterval(() => {
    const { stage_status } = fscData.info;
    if (stage_status === 4 && (!result || (result && result.reward_id === ''))) {
      getResult({ roomId, betType });
    }
    if (stage_status !== 4 && stage_status !== 5) {
      resetResult(null);
    }
    if (stage_status === 5) {
      setNum(0);
      handleResult(fscData);
    }
  }, 2000);

  const handleResult = (data) => {
    let seatArr:Array<object> = [];
    for (let i = 0; i < 12; i++) {
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
        id: ele.position
      }
    });
    setMic(seatArr);
  }

  const handleChip = (index: number) => {
    if (chip === index) {
      setChip('');
    } else {
      setChip(index);
    }
  }

  const handleBall = (key: number, two:number[], seat: number | string) => {
    if (chip === '' || fscData.info.stage_status !== 3) {
      return;
    }
    if (two.length === 2 && two.indexOf(key) < 0) {
      return;
    }
    if (!seat && own !== '') {
      seat = own;
    }
    const current:HTMLElement = document.getElementById(`reward-${key}`) as HTMLElement;
    const set:HTMLElement = document.getElementById(`seat-${seat}`) as HTMLElement;
    const parent:HTMLElement = document.getElementById(`reward`) as HTMLElement;
    let eleLeft: number = 0;
    const leftPos = (Math.random() < 0.5 ? -1 : 1) * Math.round(Math.random() * 20);
    const topPos = (Math.random() < 0.5 ? -1 : 1) * Math.round(Math.random() * 20);

    if (seat < 7) {
      eleLeft = current.offsetLeft + parent.offsetLeft + leftPos + set.offsetLeft;
    } else {
      eleLeft = (leftPos + set.offsetLeft - current.offsetLeft - parent.offsetLeft - 20) * -1;
    }
    const eleTop = current.offsetTop + topPos + 250 - set.offsetTop
    let ballPos = {
      left: `${eleLeft}px`,
      top: `${eleTop}px`,
      active: chip,
      diamond: fscData.bet[chip].diamond
    }
    let temp = mic;
    let tempNum = num + fscData.bet[chip].diamond;
    let deduction = temp[seat].user_info.balance - fscData.bet[chip].diamond;
    if (deduction >= 0) {
      temp[seat].user_info.balance = deduction;
      temp[seat].ball.push(ballPos);
      setNum(tempNum);
      setMic([ ...temp ]);
    }
    setBetItem([{
      rewardId: two.length === 2 ? `${fscData.reward[two[0]].id},${fscData.reward[two[1]].id}` : fscData.reward[key].id.toString(),
      betId: fscData.bet[chip].id,
      betMany: two.length === 2 ? 2 : 1
    }])
  }

  return (

    <div className={styles.main}>
      <div className={styles.nav}>
        <div className={styles.leftNav}>
          <div onClick={ () => setRecords(true) }>{ text.records }</div>
          <div onClick={ () => setRules(true) }>{ text.rules }</div>
          <div onClick={ () => setRank(true) }>{ text.rank }</div>
        </div>
        <div className={styles.close}>
          <img src={close}  />
        </div>
      </div>

      { fscData && <Disc info={fscData.info} history={fscData.history} result={result}  /> }

      { fscData &&
        <Mainer
        fscData={fscData}
        chip={chip}
        result={result}
        num={num}
        handleBall={ (reward, two) => handleBall(reward, two, '') }
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
