import { useEffect, useState } from "react";
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

const Baccarat = () => {
  const [ showRules, setRules ] = useState<boolean>(false);
  const [ showReward, setReward ] = useState<boolean>(false);
  const [ showRecords, setRecords ] = useState<boolean>(false);
  const [ showRank, setRank ] = useState<boolean>(false);
  const [ chip, setChip ] = useState<number | string>('');
  const { data: fscData, request: getFsc } = useRequest(fscService.getFsc);
  const { request: getStart } = useRequest(fscService.getStart);
  const [ mic, setMic ] = useState<object[]>([]);
  const [ master, setMaster ] = useState<number | string>('');

  useEffect(() => {
    let roomId:string | boolean = getQueryVariable('roomId');
    let betType:string | boolean = getQueryVariable('betType');

    const fetchData = async () => {
      await getStart({ roomId, betType });
      let data = await getFsc({ roomId, betType });
      let seatArr:Array<object> = [];
      for (let i = 0; i < 13; i++) {
        seatArr.push({
          ball: [],
          id: i
        });
      }
      data.user_mic_serial.forEach(ele => {
        if (ele.user_info.is_master === 1) {
          ele.user_info.balance = 3000;
          setMaster(ele.position);
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
  }, [fscData])

  const handleChip = (index: number) => {
    if (chip === index) {
      setChip('');
    } else {
      setChip(index);
    }
  }


  const handleBall = (dom: string, seat: number | string) => {
    if (chip === '') {
      return;
    }
    if (!seat && master !== '') {
      seat = master;
    }
    const current:HTMLElement = document.getElementById(dom) as HTMLElement;
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
  }
  return (

    <div className={styles.main}>
      <div className={styles.nav}>
        <div onClick={ () => setRecords(true) }>{ text.records }</div>
        <div onClick={ () => setRules(true) }>{ text.rules }</div>
        <div onClick={ () => setRank(true) }>{ text.rank }</div>
      </div>

      <Disc />

      { fscData &&
        <Mainer
        fscData={fscData}
        chip={chip}
        handleBall={ (dom, index) => handleBall(dom, index) }
        handleChip={ (index) => handleChip(index) } /> }

      { mic.length > 0 && <Seat mic={mic} /> }

      { fscData && showRules && <Rules rule={fscData.rule} handleShow={ () => setRules(false) } /> }

      { showRecords && <Records handleRecords={ () => setRecords(false)} /> }

      { showReward && <Reward handleReward={ () => setReward(false)  } /> }

      { showRank && !showReward && <Rank handleReward={ () => setReward(true)  } handleRank={ () => setRank(false) } /> }

    </div>
  );
};

export default Baccarat;
